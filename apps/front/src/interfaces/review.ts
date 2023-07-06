export interface CreateReview {
    missionId: string
    rating: number
    comment: string
}

export interface ReviewI {
    rating: number
    comment: string
}

export interface UpdateReview extends Partial<ReviewI> {
    missionId: string
    rating?: number
    comment?: string
}

export interface DeleteReview {

}