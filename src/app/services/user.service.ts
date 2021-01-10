
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
  /**
   * get all users
   */
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(URL+ "user/findall", {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  /**
   * get user by his id
   * @param id 
   */
  findById(id: number): Observable<User> {
    return this.http.get<User>(URL + "user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }
  /**
   * delete user
   * @param id 
   */
  delete(id: number) {
    return this.http.delete(URL + "user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }
  /**
   * update user
   * @param id 
   * @param data 
   */
  update(id: number, data): Observable<User> {
    return this.http.patch<User>(URL + "user/update/" + id, data, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }
  /**
   * credit user wallet
   * @param id 
   * @param amount 
   */
  creditUser(id: number, amount:number) {
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
  /**
   * find user img
   * @param id_user 
   */
  findImgUser(id_user: number): Promise<any> {
    return this.http.get<any>(URL + "user/findimg/" + id_user).toPromise();
  }

  /***
   * debit user wallet
   */
  debitUser(id: number, amount:number){
    if (!this.authenticationService.jwtToken)
      this.authenticationService.jwtToken = this.authenticationService.loadToken();
    return this.http.post(URL+ 'user/debit/'+id+'?amount='+amount, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }
  async updateImage(image, UserId){
    return this.http.patch(URL+ 'user/updateimg/'+UserId, image).toPromise()
      .then(res => {
        return res
      });
  }

  show(){
    this.display = true;
  }
  onClose() {
    this.display = false;
  }
  /**
   * 
   * @param user change user status
   */
  changeUserStatus(user) {
    if(user.status == 0) {
      return this.http.patch(URL+'user/deactivate/'+user.id, null);
    } else {
      return this.http.patch(URL+'user/activate/'+user.id, null);
    }

  }



}
