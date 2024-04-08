import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.inteface";
import { authActions } from "./actions";

export const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
  }

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.register, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
        })),
        on(authActions.registerSuccess, (state, action) => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        })),
        on(authActions.registerFailure, (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
        })),
        on(authActions.login, (state) => ({
            ...state,
            isSubmitting: true,
        })),
        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
        })),
        on(authActions.loginFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors.error
        })),
        on(authActions.getCurrentUser, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(authActions.getCurrentUserSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
        })),
        on(authActions.getCurrentUserFailure, (state,action) => ({
        ...state,
        isLoading: false,
        currentUser: null,
        })),
        on(authActions.update, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(authActions.updateSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
        })),
        on(authActions.updateFailure, (state,action) => ({
        ...state,
        isLoading: false,
        currentUser: null,
        validationErrors:action.errors
        })),
        on(authActions.logOut, (state) => ({
            ...state,
            currentUser:null
        })),
    )
})

export const {
    name: authFeatureKey,
    reducer: 
            authReducer,
            selectCurrentUser,
            selectIsLoading,
            selectIsSubmitting,
            selectValidationErrors
} = authFeature