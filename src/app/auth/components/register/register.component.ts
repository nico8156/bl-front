import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { authActions } from "../../store/actions";
import { Store } from "@ngrx/store";

@Component({
    selector: 'bl-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports:[ReactiveFormsModule]
})

export class RegisterComponent{

    fb = inject(FormBuilder)
    service = inject(AuthService)
    store = inject(Store)

    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })

    onSubmit(){
        const request:RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.register({request}))
    }
}