export interface MessageI {
    id: string
    message: string
    sender: string
    read: boolean
}

export interface CreateMessage {
    chatId: string
    message: string
    sender: string
}

export interface UpdateMessage extends Partial<MessageI> {
    chatId: string
    message?: string
}