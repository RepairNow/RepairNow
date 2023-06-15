export interface MessageI {
    id: string
    message: string
    sender: string
    read: boolean
}

export interface CreateMessage {
    message: string
    sender: string
}

export interface UpdateMessage extends Partial<MessageI> {
    message?: string
}