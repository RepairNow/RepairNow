export interface CreateReview {
    rating: number
    comment: string
}

export interface ReviewI {
    id: string
    rating: number
    comment: string
}

export interface UpdateReview extends Partial<ReviewI> {
    rating?: number
    comment?: string
}