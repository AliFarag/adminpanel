import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuider: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.auth.logout();

    this.loginForm = this.formBuider.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get current url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // getter for login form controller
  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // check if form is valid
    if (this.loginForm.invalid) {
      return false;
    }
    this.loading = false;
    const userName = this.loginFormControl.user_name;
    const userPassword = this.loginFormControl.password;
    this.auth.login(userName.value, userPassword.value)
        .subscribe(
          userData => {
            this.router.navigate([this.returnUrl]);
          }
          ,
          error => {
            console.log('login fail');
            this.loading = false;
          });


  }

}
