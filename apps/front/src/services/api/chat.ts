import { ChatI, CreateChat } from "@/interfaces/chat";
import { clientCom } from "..";

// Class containing everything related to chat and messages
class Chat {
	async _createChat(payload: CreateChat): Promise<ChatI> {
		try {
			const res = await clientCom.post(
				"/conversations/create-conv",
				payload
			);
			return res.data;
		} catch (err) {
			throw err;
		}
	}
}

const chatService = new Chat();

export default chatService;
