import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {URL} from "../api-url/url";
import {MealDTO} from "../models/mealDTO";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meal:MealDTO = new MealDTO;
  mealList:MealDTO [] =[];


  constructor(private http: HttpClient) { }

  async getMeals():Promise<[]>{
    return this.http.get<[]>(URL+"meal/findall")
    .toPromise();

 }
  getById(mealId: number): Promise<any> {
    return this.http.get<any>(URL + "meal/find/mealId").toPromise();
  }

  getMealWeek(): Promise<any> {
    return this.http.get<any>(URL + "meal/findallavailableforweek/1").toPromise();
  }

  async findImgMeal(id_meal: number): Promise<any> {
    return this.http.get<any>(URL + "meal/findimg/" + id_meal).toPromise();
  }



  deleteMeal(mealtId: number) {
    return this.http.delete(URL + "meal/delete/"+mealtId);
  }

  async updateImage(image, mealId){
    return this.http.patch(URL+ 'meal/updateimg/'+mealId, image).toPromise()
      .then(res => {
        return res
      });
  }

  async updateMeal(mealId: number, meal:MealDTO){
    return this.http.patch(URL+ 'meal/update/'+mealId, meal).toPromise()
      .then(res => {
        return res
      });
  }
  ///meal/add new
  async addMeal(mealDTO: MealDTO) {
    return this.http.put(URL+ 'meal/add/', mealDTO).toPromise()
      .then(res => {
        return res
      });
  }
}

