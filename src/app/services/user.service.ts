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

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(URL+ "user/findall", {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(URL + "/user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(URL + "/user/find/" + id, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }

  update(id: number, data): Observable<User> {
    return this.http.patch<User>(URL + "/user/update/" + id, data, {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})});
  }
}
