import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import {URL} from "../api-url/url";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  display: boolean;


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(URL+ "user/findall", {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(URL + "user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  delete(id: number) {
    return this.http.delete(URL + "user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  update(id: number, data): Observable<User> {
    return this.http.patch<User>(URL + "user/update/" + id, data, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  creditUser(id: number, amount:number) {
    console.log(this.authenticationService.jwtToken);
    /*
    return this.http.post<User>(URL+ 'user/credit/'+id+'?amount='+amount, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  */
   return  fetch(URL+ 'user/credit/'+id+'?amount='+amount, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.authenticationService.jwtToken
      }
    });
  }
  findUserImag(id: number) {
    return this.http.get<User>(URL + "/user/findimg/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  debitUser(id: number, amount:number){
    if (!this.authenticationService.jwtToken)
      this.authenticationService.jwtToken = this.authenticationService.loadToken();
    return this.http.post(URL+ 'user/debit/'+id+'?amount='+amount, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  show(){
    this.display = true;
  }
  onClose() {
    this.display = false;
  }

  changeUserStatus(user) {
    if(user.status == 0) {
      return this.http.patch(URL+'user/deactivate/'+user.id, null);
    } else {
      return this.http.patch(URL+'user/activate/'+user.id, null);
    }

  }

}
