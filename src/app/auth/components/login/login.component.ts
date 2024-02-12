import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginRequestInterface } from "../../types/loginRequestInterface";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";

@Component({
    selector:'bl-login',
    templateUrl:'./login.component.html',
    standalone: true,
    imports:[ReactiveFormsModule]
})

export class LoginComponent{

    fb = inject(FormBuilder);
    store = inject(Store)

    form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })

    onSubmit(){
        const request:LoginRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.login({request}))
    }
}