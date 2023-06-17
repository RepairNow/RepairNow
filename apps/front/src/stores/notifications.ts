import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import notificationService from "@/services/api/notification";
import { NotificationI } from "@/interfaces/notification";

export const useNotificationStore = defineStore("notification", () => {
    const { _getNotifications } = notificationService;

    const notifications: Ref<NotificationI[]> = ref([]);

    async function getNotifications(userId: string) {
        try {
            const res = await _getNotifications(userId);
            notifications.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { notifications, getNotifications };
});
