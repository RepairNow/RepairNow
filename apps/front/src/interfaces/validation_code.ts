import { ReviewI } from "./review"
export interface CreateMission {
    announcementId: string
    providerId: string
    status: string
}

export interface ValidationCodeI {
    id: string
    missionId: string
    currentStatus: string
    code: number
}
