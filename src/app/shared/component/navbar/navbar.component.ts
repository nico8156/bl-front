import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector:'bl-navbar',
    templateUrl:'./navbar.component.html',
    styleUrl:'./navbar.component.scss',
    standalone: true,
    imports:[CommonModule, RouterLink]
})

export class NavBarComponent{
    store = inject(Store)

    data$ = combineLatest({
        currentUser: this.store.select(selectCurrentUser)
    })

    logOut(){
        localStorage.clear()
        window.location.reload()
    }
    
}