import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  users: User[];
  deleteUser:  false;

  constructor(private _activatedRoute: ActivatedRoute, private _userService: AuthenticationService) { }

  ngOnInit() {
    this.title = 'Admin panel';
    this.getAllUsers();
    this._activatedRoute.queryParams.subscribe(data => {
      if (typeof data.delete !== undefined) {
        this.deleteUser = data.delete;
      }
    });
  }

  getAllUsers() {
    this._userService.getUsersList().subscribe(usersList => this.users = usersList);
  }

}
