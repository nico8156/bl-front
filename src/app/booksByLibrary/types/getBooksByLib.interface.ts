import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb"
import { GetBooksResponseInterface } from "../../home/types/getBooksResponse.interface"
import { GetBooksByLibResponseInterface } from "./getBooksByLibResponse.interface"


export interface BooksByLibStateInterface{
    isLoading: boolean
    error: string | null
    data: FormatedBookForDb[] | null
}