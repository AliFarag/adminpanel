import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { User } from '../_models/user';
import { AuthenticationService } from '../services/authentication.service';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  currentDetails: User;
  userId: number;
  private routeSub: any;
  editUserForm: FormGroup;
  updateRes = false;
  submitted = false;

  constructor(private _route: ActivatedRoute,
              private _userService: AuthenticationService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.routeSub = this._route.params.subscribe(params => {
      this.userId = +params['id'];
    });

    this._userService.getUserDetails(this.userId).subscribe(user => this.currentDetails = user);

    // build edit user form
    this.editUserForm = this._formBuilder.group({
      username: [this.currentDetails.userName, Validators.required],
      firstName: [this.currentDetails.firstName, Validators.required],
      lastName: [this.currentDetails.lastName, Validators.required],
      email: [this.currentDetails.email, Validators.compose([Validators.required, Validators.email])],
      salary: [this.currentDetails.salary]
    });

  }

  // get edit user form controls
  get editUserFormControl() {
    return this.editUserForm.controls;
  }

  editUser() {
    this.submitted = true;
    if (this.editUserForm.invalid) {
      this.updateRes = false;
      window.scroll(0, 0);
      return false;
    }
    this.updateRes = this._userService.updateUserInfo(this.currentDetails);
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
