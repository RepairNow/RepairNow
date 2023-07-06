export interface NotificationI {
    id: string
    userId: string
    title: string
    content: string
    created_at: string
}

export interface SendNotification {
    title: string
    content: string
}