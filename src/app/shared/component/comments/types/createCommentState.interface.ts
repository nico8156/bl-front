import { CreateCommentResponseInterface } from "./createCommentResponse.interface"

export interface CommentStateInterface{
    isLoading: boolean
    error: string|null
    comments: CreateCommentResponseInterface[] | []
}