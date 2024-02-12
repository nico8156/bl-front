import { inject } from "@angular/core"
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { AuthService } from "../services/auth.service"
import { PersistanceService } from "../../shared/services/persistance.service"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { authActions } from "./actions"
import { CurrentUserInterface } from "../../shared/types/currentUser.interface"
import { HttpErrorResponse } from "@angular/common/http"
import { Router } from "@angular/router"
import { LinksService } from "../../shared/component/navlink/services/links.service"


export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const user = persistanceService.get('user')

        if (!user) {
          return of(authActions.getCurrentUserFailure())
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({currentUser})
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure())
          })
        )
      })
    )
  },
  {functional: true}
)



export const registerEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
    ) => {
      return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
          return authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              return authActions.registerSuccess({currentUser})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                authActions.registerFailure({
                  errors: errorResponse.error.errors,
                })
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
  export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
          router.navigateByUrl('/login')
        })
      )
    },
    {functional: true, dispatch: false}
  )

  export const loginEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      persistanceService = inject(PersistanceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.login),
        switchMap(({request}) => {
          return authService.login(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              persistanceService.set('accessToken', currentUser.jwt)
              persistanceService.set('user', currentUser)
              return authActions.loginSuccess({currentUser})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                authActions.loginFailure({
                  errors: errorResponse.error.errors,
                })
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
  export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
          router.navigateByUrl('/home')
        })
      )
    },
    {functional: true, dispatch: false}
  )

  // export const loadLibForUserAfterLoginEffect = createEffect(
  //   (actions$ = inject(Actions), linksService = inject(LinksService)) => {
  //     return actions$.pipe(
  //       ofType(authActions.loginSuccess),
  //       tap(() => {
  //         linksService.getLinks()
  //       })
  //     )
  //   },
  //   {functional: true, dispatch: false}
  // )