import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { bookInfoActions } from "../store/actions";
import { combineLatest, map } from "rxjs";
import { selectBookInfodata, selectError, selectIsLoading } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { BookInfoService } from "../service/bookInfo.service";
import { selectLinks } from "../../shared/component/navlink/store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { FormsModule } from "@angular/forms";
import { FormatedBookForDb } from "../types/formatedBookForDb";
import { SaveBookRequestInterface } from "../types/saveBookRequest.interface";
import { CleanTextPipe } from "../../shared/customPipes/cleanText.pipe";

@Component({
    selector:'bl-bookInfo',
    templateUrl:'./bookInfo.component.html',
    styleUrl:'./bookInfo.component.scss',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, CleanTextPipe]
})

export class BookInfoComponent implements OnInit{
    
    route = inject(ActivatedRoute)
    store = inject(Store)
    bookInfoService = inject(BookInfoService)

    slug: string = this.route.snapshot.paramMap.get('slug') ?? ''

    selectedLibrary: string = ''

    userId:number = 0

    libraryId:number = 0

    bookToSendToDb: FormatedBookForDb = {
        googleId : '',
        title: '',
        authors: '',
        publisher: '',
        description: '',
        imageLinks : '',
        pageCount: 0
    }

    request : SaveBookRequestInterface = {
        book : this.bookToSendToDb,
        userId: this.userId,
        libraryId: this.libraryId
    }

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        book: this.store.select(selectBookInfodata),
        links: this.store.select(selectLinks),
        user: this.store.select(selectCurrentUser)
      })
    
    ngOnInit(): void {
        this.store.dispatch(bookInfoActions.getBookInfo({slug: this.slug}))
    }
    saveBook(libraryName: string){
        
        this.data$.subscribe((data => {

            this.bookToSendToDb = {
                googleId :data.book?.id ?? '',
                title: data.book?.volumeInfo.title ?? '',
                authors:data.book?.volumeInfo.authors?.toString() ,
                publisher: data.book?.volumeInfo.publisher,
                description: data.book?.volumeInfo.description,
                imageLinks : data.book?.volumeInfo.imageLinks?.thumbnail,
                pageCount: data.book?.volumeInfo.pageCount,
            }

            const X = data.links?.filter(lib => lib.libraryName === libraryName) ?? []

            this.libraryId = X[0].libraryId
            
            this.userId = data.user?.userId ?? 0
            
            const bookToSaveToDb = this.bookToSendToDb

            this.request  = {
                book: bookToSaveToDb,
                userId: this.userId,
                libraryId: this.libraryId
            }
            
        }))
        const requestBis = this.request

        this.store.dispatch(bookInfoActions.saveBookToDB({request:requestBis}))
        
    }
}
