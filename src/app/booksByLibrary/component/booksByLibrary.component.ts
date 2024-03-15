import { Component, DoCheck, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { booksByLibActions } from "../store/actions";
import { combineLatest } from "rxjs";
import { selectBooksByLibData, selectIsLoading } from "../store/reducers";
import { CommonModule } from "@angular/common";

@Component({
    selector:'bl-booksLib',
    templateUrl:'./booksByLibrary.html',
    styleUrl:'./booksByLibrary.component.scss',
    standalone:true,
    imports: [CommonModule, RouterLink]
})

export class BooksByLibraryComponent implements OnInit{

    route = inject(ActivatedRoute)
    store = inject(Store)
    
    libraryId = ''

    data$ = combineLatest({
        isLoading : this.store.select(selectIsLoading),
        books: this.store.select(selectBooksByLibData)
    })

    ngOnInit(): void {
        this.route.paramMap.subscribe(param => {
            const libraryId = param.get('libraryId')
            if(libraryId)
            this.store.dispatch(booksByLibActions.getBooksByLib({libraryId: +libraryId}))
        })
    }
    
}