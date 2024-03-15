import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetBooksResponseInterface } from "../../home/types/getBooksResponse.interface";
import { GetBooksByLibResponseInterface } from "../types/getBooksByLibResponse.interface";
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";


export const booksByLibActions = createActionGroup({
    source: 'books by lib',
    events: {
      'Get books by lib': props<{libraryId: number}>(),
      'Get books by lib success': props<{data: FormatedBookForDb[]}>(),
      'Get books by lib failure': emptyProps(),
    },
  })