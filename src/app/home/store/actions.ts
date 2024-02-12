import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetBooksResponseInterface } from "../types/getBooksResponse.interface";

export const booksActions = createActionGroup({
    source: 'books',
    events: {
      'Get books': props<{url: string}>(),
      'Get books success': props<{books: GetBooksResponseInterface}>(),
      'Get books failure': emptyProps(),
    },
  })