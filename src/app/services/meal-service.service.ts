import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  jwtToken: string;
  private api_url = "http://localhost:8080/lunchtime/";
  constructor(private http: HttpClient) { }

  async getMeals():Promise<any>{
    return this.http.get<any>(this.api_url+"meal/findall",
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : this.jwtToken
      })
    }).toPromise();
 
 }
  getById(mealId: number): Promise<any> {
    return this.http.get<any>(this.api_url + "meal/find/mealId").toPromise();
  }

  getMealWeek(): Promise<any> {
    return this.http.get<any>(this.api_url + "meal/findallavailablefortoday").toPromise();
  }

  async findImgMeal(id_meal: number): Promise<any> {
    return this.http.get<any>(this.api_url + "meal/findimg/" + id_meal).toPromise();
  }

}

