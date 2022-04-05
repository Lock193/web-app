import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  auth : Login = new Login();

  constructor(private loginService : LoginService, private route : Router) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  login(){
    this.auth.username = this.username;
    this.auth.password = this.password;

    this.loginService.login(this.auth).subscribe(res => {
      if (res == null || res=="Failed"){
        alert("Wrong username or password");
        this.ngOnInit;
      } else {
        localStorage.setItem("token",res);
        this.route.navigate(['/dashboard']);
      }
    }, err => {
      alert("Login failed");
        this.ngOnInit;
    })
  }

}
