import { bookInfoReducer, initialState } from "./reducers"
import * as bookInfoActions from './actions'

describe('bookInfoReducer',() => {
    it('returns a default state', ()=> {
        const action = {type: 'Unknown'}
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
    it('get the book info', ()=> {
        const action = bookInfoActions.bookInfoActions.getBookInfo({slug: "just a slug"})
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
    it('get the book info Success', ()=> {
        const action = bookInfoActions.bookInfoActions.getBookInfoSuccess({bookInfo: {
            id: 'id',
            volumeInfo:{
                title: 'user',
                authors: ['user'],
                publisher:'a publisher',
                description:'a description',
                pageCount: 123,
                imageLinks:{
                    smallThumbnail:'small',
                    thumbnail:'big'
                }

            }
        }})
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book:{
                id: 'id',
                volumeInfo:{
                    title: 'user',
                    authors: ['user'],
                    publisher:'a publisher',
                    description:'a description',
                    pageCount: 123,
                    imageLinks:{
                        smallThumbnail:'small',
                        thumbnail:'big'
                    }
                }
            }
        }
        expect(state).toEqual(newState)
    })
    it('get the book info Failure', ()=> {
        const action = bookInfoActions.bookInfoActions.getBookInfoFailure()
        const state = bookInfoReducer(initialState,action)
        const newState = {
            isLoading: false,
            error: null,
            book:null
        }
        expect(state).toEqual(newState)
    })
    it('save book to DB', ()=> {
        const action = bookInfoActions.bookInfoActions.saveBookToDb({request: {book:{
            googleId:"string",
            title:"string",
            authors:"string",
            publisher:"string",
            description:"string",
            pageCount:456,
            imageLinks:"string"
            },
            userId:132,
            libraryId:321
        }})
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
    it('save book to DB success', ()=> {
        const action = bookInfoActions.bookInfoActions.saveBookToDbSuccess()
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
    it('save book to DB failure', ()=> {
        const action = bookInfoActions.bookInfoActions.saveBookToDbFailure()
        const state = bookInfoReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
})