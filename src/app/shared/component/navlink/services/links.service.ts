import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { LinksResponseInterface } from "../types/linksResponse.interface";
import { Store } from "@ngrx/store";
import { SaveLibraryRequestInterface } from "../types/saveLibraryRequest.interface";


@Injectable({
    providedIn: 'root',
})

export class LinksService{
    http = inject(HttpClient)
    store = inject(Store)

    getLinks(id: number): Observable<LinksResponseInterface[]>{
        const url = "http://localhost:9090/api/library"
        const fullUrl = url 
        return this.http.get<LinksResponseInterface[]>(fullUrl)
        
        
    }
    save(request: SaveLibraryRequestInterface): Observable<LinksResponseInterface>{

        const url = `http://localhost:9090/api/library/save`
        
        return this.http.post<LinksResponseInterface>(url, request.library)
            
    }
    update(request: SaveLibraryRequestInterface, id: number): Observable<LinksResponseInterface>{

        const url = `http://localhost:9090/api/library/update/${id}`

        return this.http.put<LinksResponseInterface>(url, request.library)
    }

    delete(id: number):Observable<any>{
        const url = `http://localhost:9090/api/library/delete/${id}`

        return this.http.delete<LinksResponseInterface>(url)
    }
}