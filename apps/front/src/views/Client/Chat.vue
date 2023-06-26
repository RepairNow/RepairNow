<template>
	<div class="tw-h-full tw-flex">
		<div
			:class="isSizeSM && route.params.id ? 'tw-hidden' : ''"
			class="tw-w-full tw-border-r tw-h-full sm:tw-w-96 tw-overflow-auto">
			<chat-list :chats="conversationsRef" />
		</div>
		<div
			:class="isSizeSM && !route.params.id ? 'tw-hidden' : ''"
			class="tw-h-full tw-w-full tw-p-0 sm:tw-p-0">
			<chat
				:handleSendMessage="sendMessageViaSocket"
				:chat="messagesRef"
				:chats="conversationsRef"
				:currentUser="currentUser" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ChatList from "@/components/chat/chat-list.vue";
import Chat from "@/components/chat/chat.vue";
import { useRoute } from "vue-router";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";

const route = useRoute();
const { isSizeSM } = storeToRefs(useScreenSize());
import { io } from "socket.io-client";
import { onMounted } from "vue";
import { ref, watch } from "vue";
import { token } from "@/services";
import { useUserStore } from "@/stores/user";

const socket = io("http://localhost:3005", {
	auth: {
		token: token.value,
	},
});

const conversationsRef = ref([]);
const messagesRef = ref();

// get my current user_id just to display names
const { currentUser } = storeToRefs(useUserStore());

// each time we open/switch to a conversation, we ask messages from the server
watch(
	() => route.params.id,
	(newId) => {
		socket.emit("get_messages_from_conversation", {
			conversation_id: newId,
		});
	}
);

onMounted(() => {
	socket.on("response_message", (data) => {
		// push the new message to the messages array to update the view instantly
		messagesRef.value.push(parseMessages(data));
	});

	// get conversations from the server
	socket.on("conversations", (conversations) => {
		const conversationArrayWithoutMe = conversations.map(
			(conversation: any) => {
				// Remove the current user from the list of members
				// Just to display names of other members in the chat list
				conversation.members = conversation.members.filter(
					(member: string) => member !== currentUser?.value?.sub
				);
				return conversation;
			}
		);
		conversationsRef.value = conversationArrayWithoutMe;
	});

	// get messages from the server for the current conversation
	socket.emit("get_messages_from_conversation", {
		conversation_id: route.params.id,
	});

	socket.on("response_get_messages", (data) => {
		messagesRef.value = parseMessages(data);
	});
});

const parseMessages = (messages: any) => {
	const userStore = useUserStore();
	const { currentUser } = storeToRefs(userStore);
	if (Array.isArray(messages)) {
		if (messages.length === 0) {
			return [];
		}
		// convert createdAt to Date and add a fromSelf property
		return messages.map((message: any) => {
			const date = new Date(message?.createdAt);
			return {
				...message,
				// Add createdAt only if date exists
				...(date && {
					createdAt: `${date.getHours()}:${date.getMinutes()}`,
				}),
				fromSelf: message.sender_id === currentUser?.value?.sub,
			};
		});
	} else {
		// do the same but for a single message
		const date = new Date(messages?.createdAt);
		return {
			...messages,
			...(date && {
				createdAt: `${date.getHours()}:${date.getMinutes()}`,
			}),
			fromSelf: messages.sender_id === currentUser?.value?.sub,
		};
	}
};

const sendMessageViaSocket = (message: string) => {
	if (message !== "") {
		socket.emit("create_message", {
			message,
			conversation_id: route.params.id,
		});
	}
};
</script>

<style scoped></style>
