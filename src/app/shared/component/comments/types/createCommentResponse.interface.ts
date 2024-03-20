import { UserInfoComment } from "./userInfoComment.interface"

export interface CreateCommentResponseInterface{
     commentId : number
     userDto: UserInfoComment
     googleId : string
     parentId : number|null
     title : string
     content : string
}