<template>
    <div class="tw-m-5">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Les notifications
        </div>
        <div>
            <notification-form />
        </div>
        <v-list class="notification-list">
            <v-list-item v-for="notification in notifications">
                <v-list-item-content>
                <v-list-item-title>
                    {{ notification.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ notification.content }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        <!-- Ajoutez plus de v-list-item pour chaque notification -->
        </v-list>
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
});

</script>
    
<style scoped>

</style>