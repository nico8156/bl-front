import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";

@Injectable({
    providedIn:'root',
})

export class BookBlogService{
    
    http = inject(HttpClient)
    
    getBookFromDb(googleId: string): Observable<FormatedBookForDb>{
        const url = `http://localhost:8080/api/book/${googleId}`
        return this.http.get<FormatedBookForDb>(url)
    }
}