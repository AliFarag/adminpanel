import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../_models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit, OnDestroy {

  userDetails: User;
  userId: number;
  private routeSub: any;
  deleteFailMsg = false;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: AuthenticationService) { }

  ngOnInit() {
    this.routeSub = this._route.params.subscribe(params => {
      this.userId = +params['id'];
    });

    this._userService.getUserDetails(this.userId).subscribe(user => this.userDetails = user);

  }

  onDeleteClick() {
    if (confirm('Are you sure to delete this user')) {
      const deleteRes: boolean = this._userService.deleteUser(this.userId);
      if (deleteRes) {
        // this._router.navigate([''], {queryParams: {delete: 'done'}});
      }
      this.deleteFailMsg = true;
      window.scroll(0, 0);
      return false;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
