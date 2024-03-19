import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateCommentResponseInterface } from "../types/createCommentResponse.interface";
import { Observable, map } from "rxjs";
import { CreateCommentRequestInterface } from "../types/createCommentRequest.interface";
import { response } from "express";
import { Store } from "@ngrx/store";
import { selectComments } from "../store/reducers";

@Injectable({
    providedIn:'root',
})

export class CommentsService{

    http = inject(HttpClient)
    store = inject(Store)
    
    saveComment(request:CreateCommentRequestInterface , googleId: string): Observable<CreateCommentResponseInterface>{

        const url = `http://localhost:8080/api/comment/book/${googleId}`

        return this.http.post<CreateCommentResponseInterface>(url, request)
        
    }

    getComments(googleId: string){

        const url = `http://localhost:8080/api/comment/book/${googleId}`

        return this.http.get<CreateCommentResponseInterface[]>(url)
    }
}
