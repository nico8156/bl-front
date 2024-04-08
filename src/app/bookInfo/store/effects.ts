import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookInfoService } from "../service/bookInfo.service";
import { bookInfoActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { FormatedBookForDb } from "../types/formatedBookForDb";

export const getBookInfoEffect = createEffect(
    (
        actions$ = inject(Actions),
        bookInfoService = inject(BookInfoService)
    ) => {
        return actions$.pipe(
            ofType(bookInfoActions.getBookInfo),
            switchMap(({slug})=>{
                return bookInfoService.getBookInfo(slug).pipe(
                    map((bookInfo: any) =>{
                        return bookInfoActions.getBookInfoSuccess({bookInfo})
                    }),
                    catchError(() => {
                        return of(bookInfoActions.getBookInfoFailure)
                    })
                )
            })
        )
    },
    {functional: true}
)
export const saveBookToDbEffect = createEffect(
    (
      actions$ = inject(Actions),
      bookInfoService = inject(BookInfoService),
    ) => {
      return actions$.pipe(
        ofType(bookInfoActions.saveBookToDB),
        switchMap(({request}) => {
          return bookInfoService.saveBookToDb(request).pipe(
            map(() => {
              return bookInfoActions.saveBookToDBSuccess()
            }),
            catchError(() => {
              return of(
                bookInfoActions.saveBookToDBFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
  export const redirectAfterSaveBookToDbEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(bookInfoActions.saveBookToDBSuccess),
        tap(() => {
          router.navigateByUrl('/home')
        })
      )
    },
    {functional: true, dispatch: false}
  )
