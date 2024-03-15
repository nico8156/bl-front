import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BookInterface } from "../../shared/types/book.interface";
import { FormatedBookForDb } from "../types/formatedBookForDb";
import { SaveBookRequestInterface } from "../types/saveBookRequest.interface";

export const bookInfoActions = createActionGroup({
    source: 'book info',
    events: {
        'Get book info': props<{slug: string}>(),
        'Get book info success': props<{bookInfo: BookInterface}>(),
        'Get book info failure': emptyProps(),

        'save book to DB': props<{request: SaveBookRequestInterface}>(),
        'save book to DB success': emptyProps(),
        'save book to DB failure': emptyProps(),



    }
})