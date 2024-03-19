import { createFeature, createReducer, on } from "@ngrx/store"
import { booksByLibActions } from "./actions"
import { BooksByLibStateInterface } from "../types/getBooksByLib.interface"
import { routerNavigationAction } from "@ngrx/router-store"

const initialState: BooksByLibStateInterface = {
    isLoading: false,
    error: null,
    data: [],
}

const booksByLibFeature = createFeature({   
    name: 'booksByLib',
    reducer: createReducer(
      initialState,
      on(booksByLibActions.getBooksByLib, (state) => ({...state, isLoading: true})),
      on(booksByLibActions.getBooksByLibSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        data : action.data
      })),
      on(booksByLibActions.getBooksByLibFailure, (state) => ({...state, isLoading: false})),
      on(booksByLibActions.deleteBooksFromLib, (state) => ({...state, isLoading: true})),
      on(booksByLibActions.deleteBooksFromLibSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        data : [...state.data?.filter(book => book.googleId != action.data.googleId)]
      })),
      on(booksByLibActions.deleteBooksFromLibFailure, (state) => ({...state, isLoading: false})),
      // on(routerNavigationAction, () => initialState) // inutile
    ),
})

export const {
    name: booksByLibFeatureKey,
    reducer: booksByLibReducer,
    selectIsLoading,
    selectError,
    selectData: selectBooksByLibData
} = booksByLibFeature

