import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import {Router} from '@angular/router';
import { URL } from '../api-url/url';
import {Observable} from 'rxjs';
import {ConfirmationService} from "primeng/api";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticated: boolean = false;
  jwtToken: string;
  roles: Array<any> = [];
  display: boolean;
  user: User;




  constructor(private http: HttpClient, private router:Router, private confirmationService: ConfirmationService)
  {
    this.jwtToken = this.loadToken();
    if (this.jwtToken){
      this.authenticated = true;
    }
  }



  login(form: User) {
    return  this.http.post("http://localhost:8080/lunchtime/login", form, { observe: 'response' });
  }


  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem('jwtToken', jwtToken);
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    // this.email = jwtHelper.decodeToken(this.jwtToken).sub;

  }



  getUserAuthenticated(){
    this.jwtToken = localStorage.getItem('jwtToken');
    let jwtHelper = new JwtHelper();
    if (this.jwtToken){
      this.user = jwtHelper.decodeToken(this.jwtToken).user;
      console.log(this.user);
      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
      console.log(this.roles);
    }

    return this.user ;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('jwtToken');
    return this.jwtToken;
  }

  register(user) {
    return this.http.put(URL+ "user/register", user);
  }


  logout(){
    this.jwtToken= null;
    this.authenticated = false;
    localStorage.removeItem('jwtToken');
  }

  isAdmin(){
    let jwtHelper=new JwtHelper();
    this.jwtToken= localStorage.getItem('jwtToken');
    if (this.jwtToken){
      this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
      for(let r of this.roles) {
        if(r.authority=='ROLE_LUNCHLADY'){
          return true;
        }
      }
    }
  }

  isUser(){
    let jwtHelper=new JwtHelper();
    this.jwtToken= localStorage.getItem('jwtToken');
    if (this.jwtToken){
      this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
      for(let r of this.roles) {
        if(r.authority=='ROLE_USER'){
          return true;
        }
      }
    }
  }

  getUserInfo(){
    // if(this.jwtToken==null)
    //this.jwtToken = this.loadToken();
    return this.http.get(URL+"/api/users/user-info");
  }

  show() {
    this.display = true
  }

  onClose() {
    console.log("close ");
    this.display = false
  }
}
