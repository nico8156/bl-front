import { createFeature, createReducer, on } from "@ngrx/store"
import { booksByLibActions } from "./actions"
import { BooksByLibStateInterface } from "../types/getBooksByLib.interface"
import { routerNavigationAction } from "@ngrx/router-store"

const initialState: BooksByLibStateInterface = {
    isLoading: false,
    error: null,
    data: null,
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
      on(routerNavigationAction, () => initialState)
    ),
})

export const {
    name: booksByLibFeatureKey,
    reducer: booksByLibReducer,
    selectIsLoading,
    selectError,
    selectData: selectBooksByLibData
} = booksByLibFeature

