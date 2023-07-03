import {UserI} from "@/interfaces/user";

export interface CreateEstimate {
    price: number
    description: string
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
    prestataire: UserI
    price: number
    description: string
    status: string
    images: File[]
    checkoutPageUrl: string
}