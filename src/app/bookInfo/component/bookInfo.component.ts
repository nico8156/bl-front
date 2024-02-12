import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { bookInfoActions } from "../store/actions";
import { combineLatest, map } from "rxjs";
import { selectBookInfodata, selectError, selectIsLoading } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { BookInfoService } from "../service/bookInfo.service";
import { selectLinksData } from "../../shared/component/navlink/store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'bl-bookInfo',
    templateUrl:'./bookInfo.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule]
})

export class BookInfoComponent implements OnInit{
    route = inject(ActivatedRoute)
    store = inject(Store)
    bookInfoService = inject(BookInfoService)

    slug = this.route.snapshot.paramMap.get('slug') ?? ''
    selectedLibrary = ''
    bookToSendToDb = {}
    userId = 0
    libraryId = 0

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        book: this.store.select(selectBookInfodata),
        links: this.store.select(selectLinksData),
        user: this.store.select(selectCurrentUser)
      })
    
    ngOnInit(): void {
        this.store.dispatch(bookInfoActions.getBookInfo({slug: this.slug}))
    }
    saveBook(libraryName: string){
        
        console.log(libraryName)
        this.data$.subscribe(data => {
            this.bookToSendToDb = {
                googleId : data.book?.id,
                title: data.book?.volumeInfo.title,
                authors: data.book?.volumeInfo.authors?.toString(),
                publisher: data.book?.volumeInfo.publisher,
                description: data.book?.volumeInfo.pageCount,
                imageLinks : data.book?.volumeInfo.imageLinks?.thumbnail
            }
            const X = data.links?.filter(lib => lib.libraryName === libraryName) ?? []
            this.libraryId = X[0].libraryId
            console.log(this.libraryId)
            this.userId = data.user?.userId ?? 0
            console.log(this.userId)

        })
        console.log(this.bookToSendToDb)
        
    }
}
