export interface CreateEstimate {
    announcementId: string
    providerId: string
    price: number
    description: string
    status: string
    images: File[]
}

export interface UpdateEstimate extends Partial<EstimateI> {
    price?: number
    description?: string
    status?: string
    images?: File[]
}

export interface EstimateI {
    id: string
    announcementId: string
    providerId: string
    price: number
    description: string
    status: string
    images: File[]
}