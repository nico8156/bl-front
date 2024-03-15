import { createFeature, createReducer, on } from "@ngrx/store"
import { CommentStateInterface } from "../types/createCommentState.interface"
import { commentsActions } from "./actions"

const initialState: CommentStateInterface = {
    isLoading: false,
    error: null,
    comments: []
}

const commentFeature = createFeature({
    name: 'Comment',
    reducer: createReducer(
        initialState,
        on(commentsActions.createComment, (state) => ({...state, isLoading: true})),
        on(commentsActions.createCommentSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            comments: [...state.comments, action.comment]
        })),
        on(commentsActions.createCommentFailure, (state) => ({...state, isLoading: false})),

        on(commentsActions.getComments, (state) => ({...state, isLoading: true})),
        on(commentsActions.getCommentsSuccess, (state, action) => ({ ...state, isLoading: false, comments: action.comments})),
        on(commentsActions.getCommentsFailure, (state) => ({...state, isLoading: false})),
    )
})

export const {
    name: commentsFeatureKey,
    reducer: commentsReducer,
    selectIsLoading,
    selectError,
    selectComments
} = commentFeature