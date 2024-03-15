import { UserInfoComment } from "./userInfoComment.interface"

export interface CreateCommentResponseInterface{
     commentId : number
     userDto: UserInfoComment
     googleId : string
     parentId : number
     title : string
     content : string
}