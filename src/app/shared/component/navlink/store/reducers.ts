import { createFeature, createReducer, on } from "@ngrx/store"
import { linksActions } from "./actions"
import { LinksStateInterface } from "../types/linksState.interface"

export const initialState : LinksStateInterface = {
    isLoading : false,
    error: null,
    links: []    
}

const LinksFeature = createFeature({
    name: 'links',
    reducer: createReducer(
        initialState,
        on(linksActions.getLinks, (state) => ({...state, isLoading: true})),
        on(linksActions.getLinksSuccess, (state, action) => ({...state, links: action.links, isLoading: false})),
        on(linksActions.getLinksFailure, (state) => ({...state, isLoading: false})),

        on(linksActions.saveLink, (state) => ({...state, isLoading: true})),
        on(linksActions.saveLinkSuccess, (state, action) => ({...state, isLoading: false, links: [...state.links, action.link]})),
        on(linksActions.saveLink, (state) => ({...state, isLoading: false})),

        on(linksActions.updateLink, (state) => ({...state, isLoading: true})),
        on(linksActions.updateLinkSuccess, (state, action) => ({...state, isLoading: false, links: [...state.links.map(link => link.libraryId !== action.link.libraryId ? link : action.link)]})),
        on(linksActions.updateLinkFailure, (state) => ({...state, isLoading: false})),

        on(linksActions.deleteLink, (state) => ({...state, isLoading: true})),
        on(linksActions.deleteLinkSuccess, (state, action) => ({...state, isLoading: false, links: [...state.links.filter(link => link.libraryId !== action.link.libraryId)]})),
        on(linksActions.deleteLinkFailure, (state) => ({...state, isLoading: false})),
        
    )
})

export const {
    name: linksFeatureKey,
    reducer: linksReducer,
    selectError,
    selectIsLoading,
    selectLinks
} = LinksFeature