import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuider: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuider.group({
      user_name: ['user_name', Validators.required],
      password: ['password', Validators.required]
    });
  }
  // getter for login form controller
  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

}
