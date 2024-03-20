import { commentsReducer, initialState } from "./reducers"
import * as commentsActions from './actions'

describe('commentsReducer',() => {
    it('returns a default state', ()=> {
        const action = {type: 'Unknown'}
        const state = commentsReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            comments: []
        }
        expect(state).toEqual(newState)
    })
    it('get the comments', ()=> {
        const action = commentsActions.commentsActions.getComments({googleId: "some googleId"})
        const state = commentsReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            comments: []
        }
        expect(state).toEqual(newState)
    })
    it('get the comments Success', ()=> {
        const action = commentsActions.commentsActions.getCommentsSuccess({comments: [{
            commentId: 45,
            userDto:{
                username: 'user',
                userRole: 'user',
                photo:'some link for a photo'
            },
            googleId: "some googleId",
            parentId: 12,
            title: "this is a post",
            content: "this is a content"
        }]})
        const state = commentsReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            comments: [{
                commentId: 45,
                userDto:{
                    username: 'user',
                    userRole: 'user',
                    photo:'some link for a photo'
                },
                googleId: "some googleId",
                parentId: 12,
                title: "this is a post",
                content: "this is a content"
            }]
        }
        expect(state).toEqual(newState)
    })
    it('get the comments Failure', ()=> {
        const action = commentsActions.commentsActions.getCommentsFailure()
        const state = commentsReducer(initialState,action)
        const newState = {
            isLoading: false,
            error: null,
            comments:[]
        }
        expect(state).toEqual(newState)
    })
})