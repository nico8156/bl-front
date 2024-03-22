import { bookBlogReducer, initialState } from "./reducers"
import * as bookFromDbActions from './actions'

describe('bookBlogReducer',() => {
    it('returns a default state', ()=> {
        const action = {type: 'Unknown'}
        const state = bookBlogReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)

    })
    it('Gets book From Db', ()=> {

        let googleId = {googleId:'some GG ID'}

        const action = bookFromDbActions.bookFromDbActions.getBookFromDb(googleId)
        const state = bookBlogReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            book: null
        }
        expect(state).toEqual(newState)
    })
    it('Gets the book info Success', ()=> {
        const action = bookFromDbActions.bookFromDbActions.getBookFromDbSuccess({book:{googleId:'some GG ID', title:'title', authors:'authors', publisher:'publisher', description:'description', pageCount:456, imageLinks:'some link for photo'}})
        const state = bookBlogReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            book:{googleId:'some GG ID', title:'title', authors:'authors', publisher:'publisher', description:'description', pageCount:456, imageLinks:'some link for photo'}
        }
        expect(state).toEqual(newState)
    })
    it('Gets the book info Failure', ()=> {
        const action = bookFromDbActions.bookFromDbActions.getBookFromDbFailure()
        const state = bookBlogReducer(initialState,action)
        const newState = {
            isLoading: false,
            error: null,
            book:null
        }
        expect(state).toEqual(newState)
    })
})