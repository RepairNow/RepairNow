export interface CreateReview {
    missionId: string
    rating: number
    comment: string
}

export interface ReviewI {
    id: string
    rating: number
    comment: string
}

export interface UpdateReview extends Partial<ReviewI> {
    id: string
    missionId: string
    rating?: number
    comment?: string
}

export interface DeleteReview {

}