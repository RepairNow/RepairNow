<template>
    <div class="tw-w-full tw-p-6 tw-bg-white tw-rounded-xl tw-shadow-lg">
        <p class="tw-text-neutral-400 tw-text-xs">Il y a {{notification.created_at}}</p>
        <p class="tw-font-bold tw-text-lg">{{notification.title}}</p>
        <p class="">{{notification.content}}</p>
    </div>
</template>

<script setup lang="ts">
import { token } from '@/services';
import { io } from 'socket.io-client';
import { onMounted } from 'vue';

const socket = io("http://localhost:3005", {
    auth: {
        token: token.value,
    },
});

onMounted(() => {
	socket.on("response_notification", (data) => {
		console.log(data);
	});
});
</script>

<style scoped>

</style>
