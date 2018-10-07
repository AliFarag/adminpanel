import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {

        const password: string = AC.get('password').value;
        const confirmPassword: string = AC.get('confirmPassword').value;

        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({MatchPassword: true});
        } else {
            return null;
        }
    }
}
