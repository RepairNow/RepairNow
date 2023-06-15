import { MessageI } from "./message"

export interface CreateChat {
    id: string
    providerId: string
    announcerId: string
}

export interface UpdateChat {
    blocked: boolean
}

export interface ChatI {
    id: string
    providerId: string
    announcerId: string
    blocked: boolean
    messages: MessageI[]
}