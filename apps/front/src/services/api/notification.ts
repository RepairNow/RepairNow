import { NotificationI } from "@/interfaces/notification";
import { client } from "..";

const namespace = "/notifications"
class Notification {

    async _getNotifications(userId: string): Promise<NotificationI[]> {
        try {
            const uri = `${namespace}/${userId}`;
            const res = await client.get(userId);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const notificationService = new Notification();

export default notificationService;