import { createFeature, createReducer, on } from "@ngrx/store";
import { BooksStateInterface } from "../types/getBooksState.interface";
import { booksActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: BooksStateInterface = {
    isLoading: false,
    error: null,
    data: null,
}

const booksFeature = createFeature({
    name: 'books',
    reducer: createReducer(
      initialState,
      on(booksActions.getBooks, (state) => ({...state, isLoading: true})),
      on(booksActions.getBooksSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        data: action.books,
      })),
      on(booksActions.getBooksFailure, (state) => ({...state, isLoading: false})),
    ),
})

export const {
    name: booksFeatureKey,
    reducer: booksReducer,
    selectIsLoading,
    selectData: selectBooksData,
    selectError
} = booksFeature

