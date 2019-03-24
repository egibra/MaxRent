import { Injectable } from '@angular/core';
import { User } from 'src/app/_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger = new Subject<boolean>();
  private loggedIn = false;
  private userName = new Subject<string>();

  baseUrl =  environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: Observable<User>;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.loggedIn = true;
          this.logger.next(this.loggedIn);
          this.userName.next(user.user.username);
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }

      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }
  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }
  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }

  logOut() {
    localStorage.removeItem('authParams');
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
    this.userName.next('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }
}

