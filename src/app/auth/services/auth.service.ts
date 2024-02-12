import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.inteface";
import { LoginRequestInterface } from "../types/loginRequestInterface";
import { PersistanceService } from "../../shared/services/persistance.service";


@Injectable({
    providedIn:'root'
})

export class AuthService{
  http= inject(HttpClient)
  persistance = inject(PersistanceService)

    login(request: LoginRequestInterface): Observable<CurrentUserInterface> {
      const url = 'http://localhost:8080/api/auth/login'
      
        return this.http
          .post<any>(url, request.user)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
    }
    
    register(data: RegisterRequestInterface): Observable<any> {
        const url = 'http://localhost:8080/api/auth/register'
        return this.http
          .post<any>(url, data.user)
          .pipe(map((response) => {
            console.log(response)
            return response
          }))
      }

      getCurrentUser(): Observable<CurrentUserInterface> {
        return of(this.persistance.get('user') as CurrentUserInterface)
        
      }
}