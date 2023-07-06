import { MessageI } from "./message";

interface IMember {
	userId: string;
	userFirstname: string;
}
export interface CreateChat {
	members: IMember[];
	announcementId: string;
}

export interface ChatI {
	_id: string;
	members: IMember[];
	announcementId: string;
	createdAt: string;
	updatedAt: string;
}
