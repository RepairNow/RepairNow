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
}

export interface UpdateMission extends Partial<MissionI> {
    status?: string
}