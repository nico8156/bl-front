import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap } from "rxjs"
import { LinksService } from "../services/links.service"
import { linksActions } from "./actions"
import { LinksResponseInterface } from "../types/linksResponse.interface"

export const getFeedEffect = createEffect(
    (actions$ = inject(Actions), linksService = inject(LinksService)) => {
      return actions$.pipe(
        ofType(linksActions.getLinks),
        switchMap(({id}) => {
          return linksService.getLinks(id).pipe(
            map((data: LinksResponseInterface[]) => {
              return linksActions.getLinksSuccess({data})
            }),
            catchError(() => {
              return of(linksActions.getLinksFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )