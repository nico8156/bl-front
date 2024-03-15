import { FormatedBookForDb } from "./formatedBookForDb";

export interface SaveBookRequestInterface{
    book:FormatedBookForDb
    userId: number
    libraryId: number
}