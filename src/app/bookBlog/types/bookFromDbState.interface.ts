import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";


export interface BookFromDbStateInterface{
    isLoading: boolean,
    error: string|null,
    book: FormatedBookForDb | null
}

