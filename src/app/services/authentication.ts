import { Injectable } from '@angular/core';
import { GlobalsProvider } from './globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationProvider {

  private userData: {
    status: number,
    token: string,
    user: {
      user_id: string,
      user_name: string,
      user_username: string,
      user_password: string,
    },
    username: string
  };

  public logged = new BehaviorSubject(false);


  constructor(public http: HttpClient, private globals: GlobalsProvider) {
    this.userData = JSON.parse(window.localStorage.getItem('userData'));
  }

  isAuthenticated() {
    return this.userData != null;
  }

  /*
  public getIsLogged(): Observable<boolean> {

    return of(this.logged);
  }*/

  getAuthToken(): string {
    if (this.userData) {
      if (this.userData.token)
        return this.userData.token;
      else
        return "";
    }
    else
      return "";
  }

  logout() {
    this.userData = null;
    this.logged.next(false);
    localStorage.removeItem("userData");
  }

  getUsername() {
    return this.userData.username;
  }

  login(userData) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'user': userData.username,
          'pass': userData.password
        })
      };

      this.http.put(this.globals.API_KEY, {}, httpOptions)
        .subscribe((res: any) => {
          console.log(res);

          this.userData = res;
          this.userData.username = userData.username;



          window.localStorage.setItem('userData', JSON.stringify(this.userData));
          this.logged.next(true);
          resolve(this.userData);
        }, (err) => {
          reject(err);
        });
    });

  }

}
