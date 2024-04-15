import { TestBed } from "@angular/core/testing"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { BookBlogService } from "./bookBlog.service"
import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb"

describe('BookBlog Service', () => {

    let bookBlogService : BookBlogService
    let HttpTestingModule : HttpTestingController

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[BookBlogService]
        })

        bookBlogService = TestBed.inject(BookBlogService)
        HttpTestingModule = TestBed.inject(HttpTestingController)
    })
    afterEach(()=> {
        HttpTestingModule.verify()
    })

    it('creates service',()=> {
        expect(BookBlogService).toBeTruthy()
    })
    describe('getBookFromDB', ()=> {
        it('gets the book from the DB',()=> {

            let bookFromDB:FormatedBookForDb
            let fakeData:FormatedBookForDb = {googleId:'some GG ID', title:'title', authors:'author', publisher:'publisher', description:'some content', pageCount:123, imageLinks:undefined}
            let googleId:string = 'some GG Id'
    
            bookBlogService.getBookFromDb(googleId).subscribe(res => {
                bookFromDB = res
                expect(bookFromDB).toEqual(fakeData)
            })
            
            const req = HttpTestingModule.expectOne(`http://localhost/api/book/${googleId}`)
            req.flush(fakeData)
            expect(req.request.method).toBe('GET')
        })
    })
})