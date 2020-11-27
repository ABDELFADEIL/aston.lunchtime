import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(URL+ "/user/findall");

  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(URL + "/user/find/" + id);
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(URL + "/user/find/" + id);
  }

  update(id: number, data): Observable<User> {
    return this.http.patch<User>(URL + "/user/update/" + id, data);
  }
}
