import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable()

export class AuthenticationService {

  currentUser: User = {
    userName: 'ali',
    password: '123456'
  };
  users: User[] = [
    {
      id: 1,
      userName: 'ali',
      password: '123456',
      firstName: 'ali',
      lastName: 'farag',
      email: 'alifarag@gmail.com',
      salary: 100
    },
    {
      id: 2,
      userName: 'mohamed',
      password: '123456',
      firstName: 'mohamed',
      lastName: 'ahmed',
      email: 'mohamed@gmail.com',
      salary: 200
    },
    {
      id: 3,
      userName: 'omar',
      password: '123456',
      firstName: 'omar',
      lastName: 'alaa',
      email: 'omar@gmail.com',
      salary: 150
    }
  ];
  ObservUser = new Observable<User>(ob => ob.next(this.currentUser));

  constructor(private _httpClient: HttpClient) { }

  // login auth
  login(username: string, password: string) {

    // const userObj: object = this.user.subscribe(userData => userData);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.ObservUser;
    // return this._httpClient.post<any>(`${config.apiUrl}/users/authenticate`, {username: username, password: password})
    // .pipe(map(
    //   user => {
    //     if (user && user.token) {
    //       localStorage.setItem('currentUser', user)
    //     }
    //     return user;
    //   }
    // ));
  }

  getUsersList() {
    return of(this.users);
  }

  // user logout
  logout() {
    localStorage.removeItem('currentUser');
  }
}
