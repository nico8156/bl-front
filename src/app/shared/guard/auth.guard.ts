import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { PersistanceService } from "../services/persistance.service";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{

    store = inject(Store)
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(selectCurrentUser).pipe(map((currentUser) => {
            console.log('inauth')
            if(!currentUser){
                return false
            }else{
                return true
            }
        }))
        
    }
}