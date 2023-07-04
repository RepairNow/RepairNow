import { MissionI } from "./mission"
import { ChatI } from "./chat"
import { EstimateI } from "./estimate"
import { UserI } from "./user"

export interface CreateAnnouncement {
    jobId: string
    title: string
    description: string
    address: string
    startTime: Date
    estimatedTime: number
    preferredHour?: string
    urgency?: boolean
}

export interface UpdateAnnouncement extends Partial<AnnouncementI> {
    title?: string
    description?: string
    images?: File[]
    address?: string
    startTime?: Date
    estimatedTime?: number
    acceptedAt?: Date
    status?: string
}

export interface AnnouncementI {
    jobId: string
    id: string
    userId: string
    user: UserI
    title: string
    description: string
    images: File[]
    address: string
    startTime: Date
    estimatedTime: number
    acceptedAt: Date
    status: string
    mission: MissionI
    chat: ChatI
    estimates: EstimateI[]
    currentStatus: string
    urgency: boolean
}