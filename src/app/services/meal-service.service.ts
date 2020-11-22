import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private api_url="http://localhost:8080/lunchtime/";
  constructor(private http:HttpClient) { }
  
  findAllMeals(){
    return this.http.get<any>(this.api_url+"meal/findall");
  }

  getById(mealId:number) : Promise<any> {
    return this.http.get<any>(this.api_url+"meal/find/mealId").toPromise();
  }   

  getMealWeek() : Promise<any> {
  return this.http.get<any>(this.api_url+"meal/findallavailablefortoday").toPromise();
    }

   async findImgMeal(id_meal:number): Promise<any> {
      return this.http.get<any>(this.api_url+"meal/findimg/"+id_meal).toPromise();
    }

}

