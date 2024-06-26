import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { LoginRequestInterface } from "../types/loginRequestInterface";
import { UpdateRequestInterface } from "../types/updateRequest.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const authActions = createActionGroup({
    source:'auth',
    events:{
        'Register': props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>(),

        'Login': props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: CurrentUserInterface}>(),
        'Login failure': props<{errors: HttpErrorResponse}>(),

        'Get current user': emptyProps(),
        'Get current user success': props<{currentUser: CurrentUserInterface}>(),
        'Get current user failure': emptyProps(),

        'Update': props<{request: UpdateRequestInterface}>(),
        'Update success': props<{currentUser: CurrentUserInterface}>(),
        'Update failure': props<{errors: BackendErrorsInterface}>(),

        'Clear errors': emptyProps(),

        'LogOut':emptyProps()
    }
})