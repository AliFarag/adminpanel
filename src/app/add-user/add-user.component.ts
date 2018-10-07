import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addUserForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  get addUserFormControl() {
    return this.addUserForm.controls;
  }

  addUser() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      console.log('invalid');
      return false;
    }
    console.log('valid');
  }

}
