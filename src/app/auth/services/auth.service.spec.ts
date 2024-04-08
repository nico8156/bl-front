import { TestBed } from "@angular/core/testing"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from "./auth.service"
import { LoginRequestInterface } from "../types/loginRequestInterface"
import { CurrentUserInterface } from "../../shared/types/currentUser.interface"
import { RegisterResponseInterface } from "../types/registerResponse.interface"
import { RegisterRequestInterface } from "../types/registerRequest.interface"
import { UpdateRequestInterface } from "../types/updateRequest.interface"

describe('Auth Service', () => {

    let authService : AuthService
    let HttpTestingModule : HttpTestingController

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[AuthService]
        })

        authService = TestBed.inject(AuthService)
        HttpTestingModule = TestBed.inject(HttpTestingController)
    })
    afterEach(()=> {
        HttpTestingModule.verify()
    })

    it('creates service',()=> {
        expect(authService).toBeTruthy()
    })
    describe('login', ()=> {
        it('logs in ',()=> {

            let fakerequest:LoginRequestInterface = {user:{email:'some email', password:'some password'}}
            let fakeResponse:CurrentUserInterface = {userId:12, username:'username', email:'some email', userRole:'user', photo:undefined, jwt:undefined}
            let user:CurrentUserInterface

            authService.login(fakerequest).subscribe(res => {
                user = res
                expect(user).toEqual(fakeResponse)
            })
            
            const req = HttpTestingModule.expectOne('http://localhost:9090/api/auth/login')
            req.flush(fakeResponse)
            expect(req.request.method).toBe('POST')
        })
    })
    describe('register', () => { 
        let registeredUser:RegisterResponseInterface
        let fakeResponse:RegisterResponseInterface = {username:'username', userRole:'user', photo:undefined}
        let fakeRegisterRequest:RegisterRequestInterface = {user:{email:'email', username:'username',password:'some password'}}

        it('registers some user', () => {
            authService.register(fakeRegisterRequest).subscribe((response) => {
                registeredUser = response
                expect(registeredUser).toEqual(fakeResponse)
            })
            const req = HttpTestingModule.expectOne('http://localhost:9090/api/auth/register')
            req.flush(fakeResponse)
            expect(req.request.method).toBe('POST')
        })
    })
    describe('getCurrentUser', () => { 
        let user:CurrentUserInterface
        let fakeResponse:CurrentUserInterface = {userId: 123, username:'username',email:'email', userRole:'user', photo:undefined, jwt:'some JWT'}

        it('returns the user logged in ', () => {
            authService.getCurrentUser().subscribe((response) => {
                user = response
                expect(user).toEqual(fakeResponse)
            })
            const req = HttpTestingModule.expectOne('http://localhost:9090/api/auth/user')
            req.flush(fakeResponse)
            expect(req.request.method).toBe('GET')
        })
    })
    describe('update', () => { 

        let user:CurrentUserInterface
        let fakeResponse:CurrentUserInterface = {userId: 123, username:'username',email:'email', userRole:'user', photo:undefined, jwt:'some JWT'}
        let fakeRequest:UpdateRequestInterface = {user:{username:'usernamebis', photo:'some photo bis'}}

        it('returns the user logged in ', () => {
            authService.update(fakeRequest).subscribe((response) => {
                user = response
                expect(user).toEqual(fakeResponse)
            })
            const req = HttpTestingModule.expectOne('http://localhost:9090/api/auth/update')
            req.flush(fakeResponse)
            expect(req.request.method).toBe('PATCH')
        })
    })

})