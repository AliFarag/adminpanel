import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new Observable<User>(ob => ob.next({
    userName: 'ali',
    password: '123456'
  }));

  constructor(private _httpClient: HttpClient) { }

  // login auth
  login(username: string, password: string) {

    const userObj: object = this.user.subscribe(userData => userData);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    return this.user;
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
