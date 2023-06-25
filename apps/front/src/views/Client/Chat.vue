<template>
    <div class="tw-h-full tw-flex">
        <div
            :class="isSizeSM && route.params.id ? 'tw-hidden' : ''"
            class="tw-w-full tw-border-r tw-h-full sm:tw-w-96 tw-overflow-auto"
        >
            <chat-list

            />
        </div>
        <div
            :class="isSizeSM && !route.params.id ? 'tw-hidden' : ''"
            class="tw-h-full tw-w-full tw-p-0 sm:tw-p-0"
        >
            <chat />
        </div>
    </div>
</template>

<script setup lang="ts">
import ChatList from "@/components/chat/chat-list.vue";
import Chat from "@/components/chat/chat.vue";
import {useRoute} from "vue-router";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";

const route = useRoute()
const {isSizeSM} = storeToRefs(useScreenSize())
import { io } from "socket.io-client";
import { onMounted } from "vue";
import {token} from "@/services";

const socket = io("http://localhost:3005", {
	auth: {
		token: token
	},
});

console.log(
	'%cChat.vue line:14 token',
	"color: #007acc;",
    token
);

onMounted(() => {
	socket.on("connect", () => {
		console.log("connected");
	});

	// emit "create_message" with body {message: "hello world"}
	socket.emit("create_message", { message: "hello world" });

	// listen "response_message" event
	socket.on("response_message", (data) => {
		console.log(data);
	});
});
</script>

<style scoped></style>
