import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookInterface } from "../../shared/types/book.interface";
import { FormatedBookForDb } from "../types/formatedBookForDb";
import { SaveBookRequestInterface } from "../types/saveBookRequest.interface";

@Injectable({
    providedIn: 'root',
})

export class BookInfoService{

    http = inject(HttpClient)
    
    getBookInfo(slug: string): Observable<BookInterface>{
        const url = `https://www.googleapis.com/books/v1/volumes/${slug}?fields=(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)`
        return this.http.get<any>(url)
    }
    saveBookToDb(data:SaveBookRequestInterface): Observable<any>{    
        const url = `http://localhost:9090/api/book/library/${data.libraryId}`
        return this.http.post<FormatedBookForDb>(url, data.book) 
    }
}
