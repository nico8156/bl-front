import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class CustomValidators{
    static passwordValidator(control: AbstractControl){

        const password = control.get('password')
        const confPassword = control.get('confirmPassword')

        return password && confPassword && password.value !== confPassword.value ? {'passwordValidator': true} : null
    }
}