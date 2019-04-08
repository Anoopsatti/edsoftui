import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({ providedIn: "root" })
export class AuthService {

  url: string = "http://localhost:3000";
  token: string;
  user: any;

  constructor(private http: HttpClient) { }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Client side Error : ${error.error.message}`;
    } else {
      // server side error
      errorMessage = `Server side Error : ${error.status} \n Message : ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // register user...................
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/user/register`, user, { headers: headers })
    // return this.http.post(`${this.url}/user/register`, user, { headers: headers }).pipe(
    //   retry(1),catchError(this.handleError)
    // );
  }

  // Login (or) authenticate user............
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/user/login`, user, { headers: headers });
  }

  // Store Token,User on local storage......
  storeUserData(token, user) {
    console.log('setting up current token and current user in local storage...');
    console.log("token befor assigning value: " + this.token);
    this.token = token;
    this.user = user;
    console.log("token after assigning value: " + this.token);
    localStorage.setItem('access_token', token);
    localStorage.setItem('access_user', JSON.stringify(user));
  }

  // storing scheduling class details......
  storeScheduleClass(classDetails){
    let headers = new HttpHeaders;
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`${this.url}/user/schedule`, classDetails, { headers: headers });
  }

  // logout user........................
  logOutUser() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  // get Token and User back from local storage
  onLoadUserData() {
    this.token = localStorage.getItem('access_token');
  }

  // verify token.......
  isLoggedIn() {
    return (localStorage.getItem('access_token') !== null);
  }

  // Get Dashboard.....
  getDashBoard() {
    this.onLoadUserData();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.get(`${this.url}/user/dashboard`, { headers: headers });
  }

}

// return this.http.post(`${this.url}/user/register`, user, { headers: headers })
    //   .pipe(map((res: any) => res.json().value));