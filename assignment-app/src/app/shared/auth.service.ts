import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users = [
    { username: 'test', password: 'test', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' }
  ];

  loggedIn = false
  admin = false

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isLogged() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );

    return isUserLogged;
  }

  isAdmin() {
    this.admin = true
  }



}
