import { Component, OnInit, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { Observable, combineLatest } from "rxjs";
import { linksActions } from "./store/actions";
import { selectLinksData } from "./store/reducers";
import { userInfo } from "os";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'bl-navlink',
    templateUrl: './navlink.component.html',
    styleUrl:'./navlink.component.scss',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive]
})

export class NavLinkComponent implements OnInit{

    store = inject(Store)

    ngOnInit(): void {
        this.store.select(selectCurrentUser).subscribe(userInfo=> {
            if(userInfo){
                this.store.dispatch(linksActions.getLinks({id:userInfo.userId}))
            }
        })
    }
    data$ = combineLatest({
        links : this.store.select(selectLinksData),
        userInfo: this.store.select(selectCurrentUser)
    })
    showId(id: number){
        console.log(id)
        localStorage.setItem('selectedLibrary', JSON.stringify(id))
    }
}

