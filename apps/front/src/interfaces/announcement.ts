import { MissionI } from "./mission"
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
    mission: MissionI
    chat: ChatI
    estimate: EstimateI[]
}