import { createFeature, createReducer, on } from "@ngrx/store"
import { linksActions } from "./actions"
import { LinksStateInterface } from "../types/linksState.interface"

const initialState : LinksStateInterface = {
    isLoading : false,
    error: null,
    data: null    
}

const LinksFeature = createFeature({
    name: 'links',
    reducer: createReducer(
        initialState,
        on(linksActions.getLinks, (state) => ({...state, isLoading: true})),
        on(linksActions.getLinksSuccess, (state, action) => ({...state, data: action.data, isLoading: false})),
        on(linksActions.getLinksFailure, (state) => ({...state, isLoading: false}))
    )
})

export const {
    name: linksFeatureKey,
    reducer: linksReducer,
    selectError,
    selectIsLoading,
    selectData: selectLinksData
} = LinksFeature