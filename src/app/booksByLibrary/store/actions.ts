import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetBooksResponseInterface } from "../../home/types/getBooksResponse.interface";
import { GetBooksByLibResponseInterface } from "../types/getBooksByLibResponse.interface";


export const booksByLibActions = createActionGroup({
    source: 'books by lib',
    events: {
      'Get books by lib': props<{libraryId: number}>(),
      'Get books by lib success': props<{data: GetBooksByLibResponseInterface[]}>(),
      'Get books by lib failure': emptyProps(),
    },
  })