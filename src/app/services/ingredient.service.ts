import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from "../api-url/url";
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private api_url="http://localhost:8080/lunchtime/";

  constructor(private http:HttpClient) { }


  findAllIngredients() : Promise<any> {
    return this.http.get<any>(this.api_url+"ingredient/findall").toPromise();
  }

  getById(ingredientId:number) : Promise<any> {
    return this.http.get<any>(this.api_url+"ingredient/find/ingredientId").toPromise();
  }

  findImgIngredient(ingredientId: number): Promise<any> {
    return this.http.get<any>(URL + "ingredient/findimg/" + ingredientId).toPromise();
  }
}








