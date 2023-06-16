export interface NotificationI {
    id: string
    userId: string
    title: string
    content: string
}

export interface SendNotification {
    userId: string
    title: string
    content: string
}