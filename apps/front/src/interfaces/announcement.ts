import { MissionI } from "./mission"
import { ChatI } from "./chat"
import { EstimateI } from "./estimate"
import { UserI } from "./user"
import { JobI } from "./job"

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
    images?: Image[]
    address?: string
    startTime?: Date
    estimatedTime?: number
    acceptedAt?: Date
    status?: string
}

export interface AnnouncementI {
    jobId: string
    job: JobI
    id: string
    userId: string
    user: UserI
    title: string
    description: string
    images: Image[]
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

export interface Image {
    id: string
    filename: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
}
