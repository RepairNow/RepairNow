import { ReviewI } from "./review"
export interface CreateMission {
    announcementId: string
    providerId: string
    status: string
}

export interface MissionI {
    id: string
    announcementId: string
    providerId: string
    status: string
    review: ReviewI
}

export interface UpdateMission extends Partial<MissionI> {
    status?: string
}

export interface DeleteMission extends Partial<MissionI> {
    id: string
    announcementId: string
    providerId: string
    status: string
}