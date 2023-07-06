import { ReviewI } from "./review"
import {AnnouncementI} from "@/interfaces/announcement";
import {ValidationCodeI} from "@/interfaces/validation_code";
export interface CreateMission {
    announcementId: string
    providerId: string
    status: string
}

export interface MissionI {
    id: string
    announcementId: string
    providerId: string
    currentStatus: string
    review: ReviewI
    announcement: AnnouncementI
    validationCode: ValidationCodeI
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