import { authReducer, initialState } from "./reducers"
import * as authActions from './actions'
import { HttpErrorResponse } from "@angular/common/http"

describe('authReducer',()=> {
    it('returns a default state', ()=> {
        const action = {type: 'Unknown'}
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: null,
            validationErrors: null,
        }
        expect(state).toEqual(newState)
    })
    it('Register', ()=> {
        const action = authActions.authActions.register({request:{user:{email:'new email',username:'username',password:'some password'}}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: true,
            isLoading: false,
            currentUser: null,
            validationErrors: null,
        }
        expect(state).toEqual(newState)
    })
    it('Register success', ()=> {
        const action = authActions.authActions.registerSuccess({currentUser:{userId:12,username:'username',email:'new email',userRole:'user'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: {userId:12,username:'username',email:'new email',userRole:'user'},
            validationErrors: null,
        }
        expect(state).toEqual(newState)
    })
    it('Register failure', ()=> {
        const action = authActions.authActions.registerFailure({errors:{type:'internal error',title:'something went wrong',status:500,detail:'problem with server',instance:'try later',access_denied_reason:'authentication problem'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: null,
            validationErrors: {type:'internal error',title:'something went wrong',status:500,detail:'problem with server',instance:'try later',access_denied_reason:'authentication problem'}
        }
        expect(state).toEqual(newState)
    })
    it('Login', ()=> {
        const action = authActions.authActions.login({request:{user:{email:'new email',password:'user password'}}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: true,
            isLoading: false,
            currentUser: null,
            validationErrors: null
        }
        expect(state).toEqual(newState)
    })
    it('Login success', ()=> {
        const action = authActions.authActions.loginSuccess({currentUser:{userId:12,username:'username',email:'new email',userRole:'user'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: {userId:12,username:'username',email:'new email',userRole:'user'},
            validationErrors: null
        }
        expect(state).toEqual(newState)
    })
    it('Login failure', ()=> {
        const errorResponse = new HttpErrorResponse({
            error: { code: `some code`, message: `some message.` },
            status: 400,
            statusText: 'Bad Request',
         });
        const action = authActions.authActions.loginFailure({errors:errorResponse})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: null,
            validationErrors:errorResponse.error
        }
        expect(state).toEqual(newState)
    })
    it('Get current user', ()=> {
        const action = authActions.authActions.getCurrentUser()
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: true,
            currentUser: null,
            validationErrors:null
        }
        expect(state).toEqual(newState)
    })
    it('Get current user success', ()=> {
        const action = authActions.authActions.getCurrentUserSuccess({currentUser:{userId:12,username:'username',email:'new email',userRole:'user'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: {userId:12,username:'username',email:'new email',userRole:'user'},
            validationErrors:null
        }
        expect(state).toEqual(newState)
    })
    it('Get current user failure', ()=> {
        // const errorResponse = new HttpErrorResponse({
        //     error: { code: `some code`, message: `some message.` },
        //     status: 400,
        //     statusText: 'Bad Request',
        //  });
        const action = authActions.authActions.getCurrentUserFailure()
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: null,
            validationErrors:null
        }
        expect(state).toEqual(newState)
    })
    it('Update', ()=> {
        const action = authActions.authActions.update({request:{user:{username:'new username',photo:'some new photo'}}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: true,
            currentUser: null,
            validationErrors:null
        }
        expect(state).toEqual(newState)
    })
    it('Update success', ()=> {
        const action = authActions.authActions.updateSuccess({currentUser:{userId:12,username:'username',email:'new email',userRole:'user'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: {userId:12,username:'username',email:'new email',userRole:'user'},
            validationErrors:null
        }
        expect(state).toEqual(newState)
    })
    it('Update failure', ()=> {
        const action = authActions.authActions.updateFailure({errors:{type:'internal error',title:'something went wrong',status:500,detail:'problem with server',instance:'try later',access_denied_reason:'authentication problem'}})
        const state = authReducer(initialState, action)
        const newState = {
            isSubmitting: false,
            isLoading: false,
            currentUser: null,
            validationErrors:{type:'internal error',title:'something went wrong',status:500,detail:'problem with server',instance:'try later',access_denied_reason:'authentication problem'}
        }
        expect(state).toEqual(newState)
    })
})