import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";
import { BookInterface } from "./book.interface";
import { CurrentUserInterface } from "./currentUser.interface";

export interface CommentInterface{
    commentId: number
    user: CurrentUserInterface
    book : FormatedBookForDb
    title: string
    content: string
    parentId: number
    createdAt: Date
}
