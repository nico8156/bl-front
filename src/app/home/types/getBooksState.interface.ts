import { GetBooksResponseInterface } from "./getBooksResponse.interface"

export interface BooksStateInterface{
    isLoading: boolean
    error: string | null
    data: GetBooksResponseInterface | null
}