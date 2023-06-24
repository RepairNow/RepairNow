import {NotificationI, SendNotification} from "@/interfaces/notification";
import { client } from "..";

const namespace = "/notifications"
class Notification {

    async _getNotifications(userId: string): Promise<NotificationI[]> {
        try {
            const uri = `${namespace}/${userId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _sendNotification(payload: SendNotification): Promise<NotificationI>
    {
        try {
            const uri = `${namespace}`;
            const res = await client.post(uri);

            return res.data
        } catch (error) {
            throw error
        }
    }
}

const notificationService = new Notification();

export default notificationService;