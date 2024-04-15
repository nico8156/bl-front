import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginRequestInterface } from "../../types/loginRequestInterface";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { Observable, Subject, combineLatest, delay, tap } from "rxjs";
import { selectValidationErrors } from "../../store/reducers";
import { CommonModule } from "@angular/common";

@Component({
    selector:'bl-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss'],
    standalone: true,
    imports:[ReactiveFormsModule, CommonModule]
})

export class LoginComponent{

    fb = inject(FormBuilder)
    store = inject(Store)

    data$ = combineLatest({
        errors: this.store.select(selectValidationErrors).pipe(
            tap(() => this.showErrorsForDuration(3000))
        )   
    })

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
    private showErrorsForDuration(duration: number): void {
        setTimeout(() => {
          this.store.dispatch(authActions.clearErrors());
        }, duration);
      }
}