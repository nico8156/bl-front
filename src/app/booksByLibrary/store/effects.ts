import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap } from "rxjs"
import { BooksByLibraryService } from "../service/booksByLibrary.service"
import { booksByLibActions } from "./actions"
import { GetBooksResponseInterface } from "../../home/types/getBooksResponse.interface"
import { GetBooksByLibResponseInterface } from "../types/getBooksByLibResponse.interface"
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb"

export const getBooksByLibEffect = createEffect(
    (actions$ = inject(Actions), booksByLibService = inject(BooksByLibraryService)) => {
      return actions$.pipe(
        ofType(booksByLibActions.getBooksByLib),
        switchMap(({libraryId}) => {
          return booksByLibService.fetchBooksByLib(libraryId).pipe(
            map((data: FormatedBookForDb[]) => {
              return booksByLibActions.getBooksByLibSuccess({data})
            }),
            catchError(() => {
              return of(booksByLibActions.getBooksByLibFailure)
            })
          )
        })
      )
    },
    {functional: true}
  )