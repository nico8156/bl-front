import { createFeature, createReducer, on } from "@ngrx/store";
import { BookInfoStateInterface } from "../types/bookInfoState.interface";
import { bookInfoActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";


const initialState: BookInfoStateInterface = {
    isLoading: false,
    error: null,
    book: null
}

const bookInfoFeature = createFeature({
    name: 'book info',
    reducer: createReducer(
        initialState,
        on(bookInfoActions.getBookInfo, (state) => ({...state, isLoading: true})),
        on(bookInfoActions.getBookInfoSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            book: action.bookInfo})),
        on(bookInfoActions.getBookInfoFailure, (state) => ({...state, isLoading: false})),
        on(bookInfoActions.saveBookToDB, (state) => ({...state, isLoading: true})),
        on(bookInfoActions.saveBookToDBSuccess, (state) => ({...state, isLoading: false})),
        on(bookInfoActions.saveBookToDBFailure, (state) => ({...state, isLoading: false})),
        on(routerNavigationAction, () => initialState),
    )
})


export const {
    name: bookInfoFeatureKey,
    reducer:bookInfoReducer,
    selectIsLoading,
    selectBook: selectBookInfodata,
    selectError 
} = bookInfoFeature