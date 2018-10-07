import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable()

export class AuthenticationService {
  currentUser: User = {
    userName: 'ali',
    password: '123456'
  };
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

  // user logout
  logout() {
    localStorage.removeItem('currentUser');
  }
}
