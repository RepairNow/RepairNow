<template>
    <div v-if="route.params.id" class="tw-h-full tw-flex tw-flex-col tw-relative tw-pb-16 tw-w-full">
        <div class="tw-p-4 tw-flex tw-items-center tw-border-b">
            <router-link :to="{name: 'client-chats'}" class="tw-p-3 tw-flex tw-items-center tw-justify-center hover:tw-bg-neutral-100">
                <v-icon icon="mdi-chevron-left" />
            </router-link>
            <p v-for="member in currentChatMembersWithoutMe" class="tw-px-4 tw-text-xl tw-font-bold">
                <span>
                    <v-avatar color="surface-variant" size="45" class="tw-ml-3"> {{ member.userFirstname?.[0] }}</v-avatar>
                    {{ member.userFirstname  }}
                </span>
                <!-- TODO: Add link to redirect to the current Annoucement -->
                <v-btn class="tw-ml-4"> Putn </v-btn> 
            </p>
        </div>
        <div class="tw-h-full tw-p-4 tw-pb-16 overflow-auto tw-flex tw-flex-col tw-gap-4">
            <div
                v-for="chat in props.chat"
                class="tw-flex"
                :class="chat.fromSelf ? 'tw-justify-end' : '' "
            >
                <span
                    class="tw-mb-1 tw-width-auto tw-justify-end tw-rounded-t-lg tw-p-3 tw-bg-red-100 tw-relative"
                    :class="chat.fromSelf ? 'tw-justify-end tw-rounded-l-lg' : 'tw-justify-end tw-rounded-r-lg' "
                >
                    {{ chat.message }}
                    <small :class="chat.fromSelf ? 'tw-absolute tw-top-12 tw-right-0' : 'tw-absolute tw-top-12 tw-left-0' ">
                        {{ chat.createdAt }}
                    </small>
                </span>
            </div>
        </div>
        <div class="lg:tw-absolute tw-bottom-3 tw-w-full tw-px-4 tw-flex tw-gap-4 tw-items-center">
            <v-text-field v-model="messageToSend" class="tw-bg-neutral-100" variant="filled" hide-details/>
            <v-btn @click="clickSend()" :disabled="messageToSend === ''" class="tw-h-full tw-rounded" icon="mdi-send"></v-btn>
        </div>
    </div>
    <div v-else class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
        <v-icon
            icon="mdi-forum-outline"
            size="80"
        />
        <p class="tw-text-xl tw-font-bold">Consultez vos messages</p>
        <p>Sélectionnez une conversation pour commencer</p>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import { ref, watch } from "vue";
const props = defineProps({
    handleSendMessage: {
        type: Function,
        required: true,
    },
    chat: {
        type: Array,
        required: true,
    },
    chats: {
        type: Array,
        required: true,
    },
    currentUser: {
        type: Object,
        required: true,
    },
});

const route = useRoute();

const currentChatMembersWithoutMe = ref(props.chats.find((chat) => chat._id === route.params.id)?.members?.filter((member) => member !== props.currentUser.sub));

// each time we open/switch to a conversation, we need to update the currentChatMembersWithoutMe
watch(
	() => route.params.id,
	(newId) => {
        currentChatMembersWithoutMe.value = props.chats.find((chat) => chat._id === newId)?.members?.filter((member) => member !== props.currentUser.sub);
	}
);

const messageToSend = ref('')

const clickSend = () => {
    props.handleSendMessage(messageToSend.value);
    messageToSend.value = '';
}

</script>

<style scoped>

</style>