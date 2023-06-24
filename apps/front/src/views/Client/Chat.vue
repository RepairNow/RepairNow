<template></template>

<script setup lang="ts">
import { getCookieFromDocument } from "@/cookiesUtils";
import { io } from "socket.io-client";
import { onMounted } from "vue";

const socket = io("http://localhost:3005", {
	auth: {
		token: getCookieFromDocument("access_token"),
	},
});

console.log(
	'%cChat.vue line:14 getCookieFromDocument("access_token")',
	"color: #007acc;",
	getCookieFromDocument("access_token")
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
