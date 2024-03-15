import { BookInterface } from "../../shared/types/book.interface"
import { FormatedBookForDb } from "./formatedBookForDb"

export interface BookInfoStateInterface{
    isLoading: boolean
    error: string | null
    book: BookInterface|null
}