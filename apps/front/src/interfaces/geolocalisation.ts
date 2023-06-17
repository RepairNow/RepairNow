export interface GeolocI {
    id: string
    x: number
    y: number
    z: number
    announcementId: string
    userId: string
}

export interface CreateGeoloc {
    x: number
    y: number
    z: number
    announcementId: string
    userId: string
}

export interface UpdateGeoloc extends Partial<GeolocI> {
    x?: number
    y?: number
    z?: number
}