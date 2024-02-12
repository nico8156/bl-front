import { BookInterface } from "../../shared/types/book.interface"

export interface BookInfoStateInterface{
    isLoading: boolean
    error: string | null
    book: BookInterface|null
}