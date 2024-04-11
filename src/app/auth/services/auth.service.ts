import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";

import { LoginRequestInterface } from "../types/loginRequestInterface";
import { UpdateRequestInterface } from "../types/updateRequest.interface";


@Injectable({
    providedIn:'root'
})

export class AuthService{
  http= inject(HttpClient)

    login(request: LoginRequestInterface): Observable<CurrentUserInterface> {
      const url = 'http://localhost/api/auth/login'
      
        return this.http
          .post<any>(url, request.user)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
    }
    
    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = 'http://localhost/api/auth/register'
        return this.http
          .post<CurrentUserInterface>(url, data.user)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
      }

      getCurrentUser(): Observable<CurrentUserInterface> {
        const url = 'http://localhost/api/auth/user'
        return this.http
          .get<any>(url)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
        
      }
      update(data: UpdateRequestInterface): Observable<CurrentUserInterface> {
        const url = 'http://localhost/api/auth/update'
        return this.http
          .patch<any>(url, data.user)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
      }
      logOut(){
        localStorage.removeItem('accessToken')
      }
}