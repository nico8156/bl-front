import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { LinksResponseInterface } from "../types/linksResponse.interface";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root',
})

export class LinksService{
    http = inject(HttpClient)
    store = inject(Store)

    getLinks(id: number): Observable<LinksResponseInterface[]>{
        const url = "http://localhost:8080/api/library/user/"
        const fullUrl = url + id
        return this.http.get<LinksResponseInterface[]>(fullUrl)
        
        
    }
}