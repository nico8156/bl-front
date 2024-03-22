import { createFeature, createReducer, on } from "@ngrx/store"
import { bookFromDbActions } from "./actions"
import { BookFromDbStateInterface } from "../types/bookFromDbState.interface"

export const initialState: BookFromDbStateInterface = {
    isLoading: false,
    error: null,
    book: null
}

const bookFromDbFeature = createFeature({
    name: 'book from Db',
    reducer: createReducer(
        initialState,
        on(bookFromDbActions.getBookFromDb, (state) => ({...state, isLoading: true})),
        on(bookFromDbActions.getBookFromDbSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            book: action.book})),
        on(bookFromDbActions.getBookFromDbFailure, (state) => ({...state, isLoading: false})),
        
    )
})

export const {
    name: bookBlogFeatureKey,
    reducer: bookBlogReducer,
    selectIsLoading,
    selectError,
    selectBook
} = bookFromDbFeature