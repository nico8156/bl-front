import { Component, DoCheck, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { booksByLibActions } from "../store/actions";
import { Subscription, combineLatest } from "rxjs";
import { selectBooksByLibData, selectIsLoading } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { BooksByLibraryService } from "../service/booksByLibrary.service";
import { selectLinks } from "../../shared/component/navlink/store/reducers";

@Component({
    selector:'bl-booksLib',
    templateUrl:'./booksByLibrary.html',
    styleUrls:['./booksByLibrary.component.scss'],
    standalone:true,
    imports: [CommonModule, RouterLink]
})

export class BooksByLibraryComponent implements OnInit, OnDestroy{

    private routeSubscription!: Subscription;

    store = inject(Store)
    service = inject(BooksByLibraryService)
    route = inject(ActivatedRoute)
    
    data$ = combineLatest({
        isLoading : this.store.select(selectIsLoading),
        books: this.store.select(selectBooksByLibData),
        links: this.store.select(selectLinks),
    })

    ngOnInit(): void {
        
        this.routeSubscription = this.route.paramMap.subscribe(params => {
            const id = params.get('libraryId')
            this.store.dispatch(booksByLibActions.getBooksByLib({libraryId: Number(id)}))
        })

    }

    deleteBook(googleId: string){
        this.routeSubscription = this.route.paramMap.subscribe(params => {
            const id = params.get('libraryId')
            console.log(id)
            if(id != null){
                this.store.dispatch(booksByLibActions.deleteBooksFromLib({googleId: googleId, libraryId:+id}))
            }
        })
        
    }

    ngOnDestroy(): void {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
          }
    }
    
}