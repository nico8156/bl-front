import { CreateCommentResponseInterface } from "./createCommentResponse.interface"

export interface GetCommentsStateInterface{
    isLoading: boolean
    error: string|null
    comment: CreateCommentResponseInterface[] | null
}