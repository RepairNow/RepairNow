import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import notificationService from "@/services/api/notification";
import {NotificationI, SendNotification} from "@/interfaces/notification";

export const useNotificationStore = defineStore("notification", () => {
    const { _getNotifications, _sendNotification } = notificationService;

    const notifications: Ref<NotificationI[]> = ref([]);

    async function getNotifications(userId: string) {
        try {
            const res = await _getNotifications(userId);
            notifications.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function sendNotification(payload: SendNotification) {
        try {
            const res = await _sendNotification(payload);
        } catch (error) {
            throw error
        }
    }

    return { notifications, getNotifications, sendNotification };
});
