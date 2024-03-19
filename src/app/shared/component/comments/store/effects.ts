import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { CommentsService } from "../service/comments.service"
import { commentsActions } from "./actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { CreateCommentResponseInterface } from "../types/createCommentResponse.interface"
import { Store } from "@ngrx/store"

export const saveCommentEffect = createEffect(
    (
      actions$ = inject(Actions),
      commentsService = inject(CommentsService),
      
    ) => {
      return actions$.pipe(
        ofType(commentsActions.createComment),
        switchMap(({request, googleId}) => {
          return commentsService.saveComment(request, googleId).pipe(
            map((comment: CreateCommentResponseInterface) => {
              return commentsActions.createCommentSuccess({comment})
            }),
            catchError(() => {
              return of(
                commentsActions.createCommentFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const getCommentEffect = createEffect(
    (
      actions$ = inject(Actions),
      commentsService = inject(CommentsService),
    ) => {
      return actions$.pipe(
        ofType(commentsActions.getComments),
        switchMap(({googleId}) => {
          return commentsService.getComments(googleId).pipe(
            map((comments: CreateCommentResponseInterface[]) => {
              return commentsActions.getCommentsSuccess({comments})
            }),
            catchError(() => {
              return of(
                commentsActions.getCommentsFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )