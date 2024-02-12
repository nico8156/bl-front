import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { HomeService } from "../service/home.service"
import { booksActions } from "./actions"
import { catchError, map, of, switchMap } from "rxjs"
import { GetBooksResponseInterface } from "../types/getBooksResponse.interface"

export const getBooksEffect = createEffect(
    (actions$ = inject(Actions), homeService = inject(HomeService)) => {
      return actions$.pipe(
        ofType(booksActions.getBooks),
        switchMap(({url}) => {

          console.log(url)
          console.log('switch')
          return homeService.fetchLivres(url).pipe(
            map((books: GetBooksResponseInterface) => {
              console.log('dans return')
              return booksActions.getBooksSuccess({books})
            }),
            catchError((e) => {
              console.log(e.status)
              return of(booksActions.getBooksFailure)
            })
          )
        })
      )
    },
    {functional: true}
  )