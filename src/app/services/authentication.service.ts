import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import {Router} from '@angular/router';
import { URL } from '../api-url/url';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtToken: string;
  roles: Array<any> = [];




  constructor(private http: HttpClient, private router:Router)
  {
    this.jwtToken = this.loadToken();

  }

  login(email, password) :Observable<any>{
    return  this.http.post(URL + "/login", { observe: 'response' });
  }


  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem('jwtToken', jwtToken);
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    // this.email = jwtHelper.decodeToken(this.jwtToken).sub;


  }

  loadToken() {
    this.jwtToken = localStorage.getItem('jwtToken');
    return this.jwtToken;
  }

  register(user) {
    return this.http.post(URL+ "/user/register", user);
  }


  logout(){
    this.jwtToken= null;
    localStorage.removeItem('jwtToken');
    this.router.navigateByUrl('/login');
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

}
