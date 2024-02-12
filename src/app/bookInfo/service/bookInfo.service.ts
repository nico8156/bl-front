import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { BookInterface } from "../../shared/types/book.interface";
import { FormatedBookForDb } from "../types/formatedBookForDb";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";
import { PersistanceService } from "../../shared/services/persistance.service";

@Injectable({
    providedIn: 'root',
})

export class BookInfoService{
    http = inject(HttpClient)
    store = inject(Store)
    service = inject(PersistanceService)
    
    getBookInfo(slug: string): Observable<BookInterface>{
        const url = `https://www.googleapis.com/books/v1/volumes/${slug}?fields=(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)`
        return this.http.get<any>(url)
    }
    saveBookToDb(book:BookInterface){
        const user = this.store.select(selectCurrentUser)
        const libraryId = localStorage.getItem('selectedLibrary')
        
        
        const url = `http://localhost:8080/api/book/user/40/library/7`
        const bookToSave = this.FormatBookForDB(book)
        this.http.post<FormatedBookForDb>(url, bookToSave)
            
    }
    FormatBookForDB(book: BookInterface): FormatedBookForDb{
        let item
        return item = {
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors?.toString(),
            publisher: book.volumeInfo.publisher,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            imageLinks: book.volumeInfo.imageLinks?.thumbnail
        }
    }
}
