import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BookInterface } from "../../shared/types/book.interface";
import { FormatedBookForDb } from "../types/formatedBookForDb";

export const bookInfoActions = createActionGroup({
    source: 'book info',
    events: {
        'Get book info': props<{slug: string}>(),
        'Get book info success': props<{bookInfo: BookInterface}>(),
        'Get book info failure': emptyProps(),

        'Save book info': props<{book: BookInterface}>(),
        'Save book info success': props<{book: BookInterface}>(),
        'Save book info failure': emptyProps(),


    }
})