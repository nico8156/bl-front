import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { authActions } from "../../store/actions";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { CustomValidators } from "../../../shared/validators/custom.validator";

@Component({
    selector: 'bl-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
    standalone: true,
    imports:[ReactiveFormsModule, CommonModule]
})

export class RegisterComponent{

    fb = inject(FormBuilder)
    service = inject(AuthService)
    store = inject(Store)

    form = this.fb.nonNullable.group({
        username: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
    }, {validators: CustomValidators.passwordValidator})

    onSubmit(){
        const request:RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.register({request}))
    }
    isUserInDb(){
        const request: string = this.form.get('username')?.value ?? ''
        console.log(request)
    }
}