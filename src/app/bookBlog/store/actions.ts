import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";


export const bookFromDbActions = createActionGroup({
    source: 'book From Db',
    events: {
        'Get book From Db': props<{googleId: string}>(),
        'Get book From Db success': props<{book: FormatedBookForDb}>(),
        'Get book From Db failure': emptyProps()
    }
})