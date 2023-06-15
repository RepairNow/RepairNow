import { ChatI, CreateChat } from "@/interfaces/chat";
import { client } from "..";
import { CreateMessage, MessageI, UpdateMessage } from "@/interfaces/message";

// Class containing everything related to chat and messages
const namespace = "/chats"
class Chat {

    async _createChat(payload: CreateChat): Promise<ChatI> {
        try {
            const res = await client.post(namespace, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getMessages(chatId: string): Promise<MessageI[]> {
        try {
            const uri = `${namespace}/${chatId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _message(payload: CreateMessage): Promise<MessageI> {
        try {
            const uri = `${namespace}/${payload.chatId}`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateMessage(payload: UpdateMessage): Promise<MessageI> {
        try {
            const uri = `${namespace}/${payload.chatId}/messages/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteMessage(payload: UpdateMessage): Promise<MessageI> {
        try {
            const uri = `${namespace}/${payload.chatId}/messages/${payload.id}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}

const chatService = new Chat();

export default chatService;