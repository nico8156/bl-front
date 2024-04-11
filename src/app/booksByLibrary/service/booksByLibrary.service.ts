import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { GetBooksByLibResponseInterface } from "../types/getBooksByLibResponse.interface";
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";

@Injectable({
    providedIn: 'root'
})

export class BooksByLibraryService{
    http = inject(HttpClient)

    baseUrl = 'http://localhost/api/book/library/'


    fetchBooksByLib(libraryId: number): Observable<FormatedBookForDb[]>{
        console.log(libraryId)
        const finalUrl = this.baseUrl + libraryId
        return this.http.get<FormatedBookForDb[]>(finalUrl) 
    }

    deleteBookFromLib(googleId: string, libraryId: number):Observable<FormatedBookForDb>{
        console.log("in Delete Book From Lib: " + {googleId} + ", " + {libraryId})
        const url = `http://localhost/api/book/${googleId}/library/${libraryId}`
        return this.http.delete<FormatedBookForDb>(url)
    }

}