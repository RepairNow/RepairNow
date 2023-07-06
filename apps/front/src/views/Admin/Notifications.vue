<template>
    <div class="tw-ml-[10%] tw-mt-10">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Les notifications
        </div>
        <div class="tw-mt-10">
            <v-timeline
            density="compact"
            side="end"
            class="tw-mb-6"
            >
                <v-timeline-item
                class="mb-6"
                hide-dot
                >
                    <span class="tw-uppercase tw-font-bold">Les dernières notifications</span>
                    </v-timeline-item>
                    
                    <v-timeline-item
                    class="mb-4"
                        dot-color="grey"
                        size="small"
                        v-for="notif in notifications"
                        >
                        <div class="d-flex justify-space-between flex-grow-1">
                            <div class="tw-uppercase tw-font-bold">
                                {{ notif.title }}
                            </div>
                            <div class="flex-shrink-0">
                                : {{ notif.content }}
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            <notification-form />
        </div>
    </div>
</template>

<script setup lang="ts">
import NotificationForm from "@/components/modal/form/notification/notification-form.vue";
import { io } from "socket.io-client";
import { token } from "@/services";
import { onMounted, ref } from "vue";

const notifications = ref([]);

const socket = io(import.meta.env.VITE_BACKENDCOM_URL, {
	auth: {
		token: token.value,
	},
});

onMounted(() => {
	socket.on("send_all_notifs", (data) => {
        console.log("liste notifs");
		console.log(data);
        notifications.value = data;
	});

    socket.on('response_notification', (data) => {
        console.log("notif");
        console.log(data);
        notifications.value.push(data);
    })
});

</script>
    
<style scoped>

</style>