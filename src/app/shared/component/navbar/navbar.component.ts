import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { authActions } from "../../../auth/store/actions";

@Component({
    selector:'bl-navbar',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.scss'],
    standalone: true,
    imports:[CommonModule, RouterLink]
})

export class NavBarComponent{
    store = inject(Store)
    router = inject(Router)

    data$ = combineLatest({
        currentUser: this.store.select(selectCurrentUser)
    })

    logOut(){
       this.router.navigateByUrl('/login')
       this.store.dispatch(authActions.logout())
    }
    
}