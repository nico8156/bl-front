import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class NavBarService{
    http = inject(HttpClient)

    getLibraryLinks(userId: string ):any{

        const url = "http://localhost:8080/api/library/user/"
        const fullUrl = url + userId

        this.http
        .get<string[]>(fullUrl)
        .pipe(map(response => console.log(response)))
    }

}