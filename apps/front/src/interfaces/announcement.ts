import { ReviewI } from "./review"
import { ChatI } from "./chat"
import { EstimateI } from "./estimate"
import { UserI } from "./user"

export interface CreateAnnouncement {
    announcerId: string
    title: string
    description: string
    images: File[]
    address: string
    startTime: Date
    endTime: Date
}

export interface UpdateAnnouncement extends Partial<AnnouncementI> {
    title?: string
    description?: string
    images?: File[]
    address?: string
    startTime?: Date
    endTime?: Date
}

export interface AnnouncementI {
    id: string
    announcerId: UserI
    title: string
    description: string
    images: File[]
    address: string
    startTime: Date
    endTime: Date
    review: ReviewI
    chat: ChatI
    estimate: EstimateI[]
}