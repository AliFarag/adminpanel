import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  users: User[];

  constructor(private _userService: AuthenticationService) { }

  ngOnInit() {
    this.title = 'Admin panel';
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getUsersList().subscribe(usersList => this.users = usersList);
  }

}
