import { Component, OnInit, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { combineLatest} from "rxjs";
import { linksActions } from "./store/actions";
import { selectIsLoading, selectLinks } from "./store/reducers";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveLibraryRequestInterface } from "./types/saveLibraryRequest.interface";



@Component({
    selector: 'bl-navlink',
    templateUrl: './navlink.component.html',
    styleUrl:'./navlink.component.scss',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule]
})

export class NavLinkComponent implements OnInit{

    store = inject(Store)
    fb = inject(FormBuilder)
    creatingLib: boolean = false

    data$ = combineLatest({
        links : this.store.select(selectLinks),
        userInfo: this.store.select(selectCurrentUser),
        isLoading: this.store.select(selectIsLoading),
    })

    form = this.fb.nonNullable.group({
        name: ['', Validators.required]
    })

    ngOnInit(): void {
        this.store.select(selectCurrentUser).subscribe(userInfo=> {
            if(userInfo){
                this.store.dispatch(linksActions.getLinks({id:userInfo.userId}))
            }
        })
    }

    toggleCreate(){
        return this.creatingLib = !this.creatingLib
    }

    onSubmit(){

        const request: SaveLibraryRequestInterface = {
            library: this.form.getRawValue()
        }
        this.store.dispatch(linksActions.saveLink({request}))
        this.form.reset()
        this.toggleCreate()
    }
}

