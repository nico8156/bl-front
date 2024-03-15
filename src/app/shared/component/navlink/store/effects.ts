import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { LinksService } from "../services/links.service"
import { linksActions } from "./actions"
import { LinksResponseInterface } from "../types/linksResponse.interface"
import { Router } from "@angular/router"

export const getLinksEffect = createEffect(
    (actions$ = inject(Actions), linksService = inject(LinksService)) => {
      return actions$.pipe(
        ofType(linksActions.getLinks),
        switchMap(({id}) => {
          return linksService.getLinks(id).pipe(
            map((links: LinksResponseInterface[]) => {
              return linksActions.getLinksSuccess({links})
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

  export const saveLibraryEffect = createEffect(
    (actions$ = inject(Actions),linksService = inject(LinksService)) => {
      return actions$.pipe(
        ofType(linksActions.saveLink),
        switchMap(({request}) => {
          return linksService.save(request).pipe(
            map((link: LinksResponseInterface) => {
              return linksActions.saveLinkSuccess({link})
            }),
            catchError(() => {
              return of(
                linksActions.saveLinkFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
  export const redirectAfterSaveEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(linksActions.saveLinkSuccess),
        tap(() => {
          router.navigateByUrl('/home')
        })
      )
    },
    {functional: true, dispatch: false}
  )
  export const updateLibraryEffect = createEffect(
    (actions$ = inject(Actions),linksService = inject(LinksService)) => {
      return actions$.pipe(
        ofType(linksActions.updateLink),
        switchMap(({request, id}) => {
          return linksService.update(request, id).pipe(
            map((link: LinksResponseInterface) => {
              return linksActions.updateLinkSuccess({link})
            }),
            catchError(() => {
              return of(
                linksActions.updateLinkFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
  export const deleteLibraryEffect = createEffect(
    (actions$ = inject(Actions),linksService = inject(LinksService)) => {
      return actions$.pipe(
        ofType(linksActions.deleteLink),
        switchMap(({id}) => {
          return linksService.delete(id).pipe(
            map((link: LinksResponseInterface) => {
              return linksActions.deleteLinkSuccess({link})
            }),
            catchError(() => {
              return of(
                linksActions.deleteLinkFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )