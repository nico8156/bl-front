import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetBooksResponseInterface } from "../types/getBooksResponse.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class HomeService{

    constructor(private http: HttpClient){}
    
    fetchLivres(url: string):Observable<GetBooksResponseInterface> {
        return this.http.get<GetBooksResponseInterface>(url)
    }
}