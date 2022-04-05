import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    user_id: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL : string = '';


  constructor(private http : HttpClient) {
    this.loginURL = "http://192.168.86.249:8081/login";
   }

   login(auth : Login) : Observable<string> {
    httpOptions.headers = httpOptions.headers.set('username', auth.username);
    httpOptions.headers = httpOptions.headers.set('password', auth.password);
    //If "Failed" is returned, error
    return this.http.post<string>(this.loginURL,null,httpOptions);
   }
}
