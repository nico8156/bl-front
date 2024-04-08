import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { filter, map } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";


export const AuthGuardService = () => {

    const store = inject(Store)
    const router = inject(Router)

    return store.select(selectCurrentUser).pipe(
        filter((currentUser) => currentUser !== null),
        map((currentUser) =>{
            if(!currentUser){
                router.navigateByUrl('/login')
                return false
            }else{
                return true
            }
        })
    )
}