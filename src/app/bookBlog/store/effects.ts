import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { BookBlogService } from "../service/bookBlog.service"
import { bookFromDbActions } from "./actions"
import { catchError, map, of, switchMap } from "rxjs"
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb"

export const getBookFromDbEffect = createEffect(
    (
        actions$ = inject(Actions),
        bookBlogService = inject(BookBlogService)
    ) => {
        return actions$.pipe(
            ofType(bookFromDbActions.getBookFromDb),
            switchMap(({googleId})=>{
                return bookBlogService.getBookFromDb(googleId).pipe(
                    map((book: FormatedBookForDb) =>{
                        return bookFromDbActions.getBookFromDbSuccess({book})
                    }),
                    catchError(() => {
                        return of(bookFromDbActions.getBookFromDbFailure)
                    })
                )
            })
        )
    },
    {functional: true}
)