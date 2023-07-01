import { MissionI } from "./mission"
import { ChatI } from "./chat"
import { EstimateI } from "./estimate"
import { UserI } from "./user"

export interface CreateAnnouncement {
    urgency: boolean
    title: string
    description: string
    images: File[]
    address: string
    date: Date
}

export interface UpdateAnnouncement extends Partial<AnnouncementI> {
    urgency?: boolean
    title?: string
    description?: string
    images?: File[]
    address?: string
    startTime?: Date
    endTime?: Date
    acceptedAt?: Date
    status?: string
}

export interface AnnouncementI {
    id: string
    urgency: boolean
    userId: string
    user: UserI
    title: string
    description: string
    images: File[]
    address: string
    startTime: Date
    endTime: Date
    acceptedAt: Date
    status: string
    mission: MissionI
    chat: ChatI
    estimate: EstimateI[]
    currentStatus: string
}