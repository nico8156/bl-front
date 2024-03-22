import { TestBed } from "@angular/core/testing"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { BookInfoService } from "./bookInfo.service"
import { BookInterface } from "../../shared/types/book.interface"
import { FormatedBookForDb } from "../types/formatedBookForDb"
import { SaveBookRequestInterface } from "../types/saveBookRequest.interface"

describe('BookInfo Service', () => {

    let bookInfoService : BookInfoService
    let HttpTestingModule : HttpTestingController

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[BookInfoService]
        })

        bookInfoService = TestBed.inject(BookInfoService)
        HttpTestingModule = TestBed.inject(HttpTestingController)
    })
    afterEach(()=> {
        HttpTestingModule.verify()
    })

    it('creates service',()=> {
        expect(bookInfoService).toBeTruthy()
    })
    describe('getBookInfo', ()=> {
        it('gets the book Info',()=> {

            let bookFromGoogle:BookInterface
            let fakeData:BookInterface = {id: 'some ID', volumeInfo:{title:'title',authors:['author'],publisher:'publisher', description:'some content', pageCount:123, imageLinks:undefined}}
            let slug:string = 'some slug'
    
            bookInfoService.getBookInfo(slug).subscribe(res => {
                bookFromGoogle = res
                expect(bookFromGoogle).toEqual(fakeData)
            })
            
            const req = HttpTestingModule.expectOne(`https://www.googleapis.com/books/v1/volumes/${slug}?fields=(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)`)
            req.flush(fakeData)
            expect(req.request.method).toBe('GET')
        })
    })
    describe('saveBookToDb', ()=> {
        it('saves the correct Data to DB', ()=> {
            
            let fakeDataToSave:SaveBookRequestInterface = {book:{googleId: 'some ID', title:'title',authors:'author',publisher:'publisher', description:'some content', pageCount:123, imageLinks:undefined},userId:321,libraryId:456}
            let fakeResponse: FormatedBookForDb = {googleId:'some GG ID', title:'title', authors:'author', publisher:'publisher', description:'some content', pageCount:123, imageLinks:undefined}

            bookInfoService.saveBookToDb(fakeDataToSave).subscribe(res => {
                expect(res).toEqual(fakeResponse)
            })

            const req = HttpTestingModule.expectOne(`http://localhost:8080/api/book/library/${fakeDataToSave.libraryId}`)
            expect(req.request.method).toBe('POST')
            req.flush(fakeResponse)
        })
    })

})