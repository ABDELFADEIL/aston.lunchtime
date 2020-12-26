import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private api_url="http://localhost:8080/lunchtime/";

  constructor(private http:HttpClient) { }


  findAllIngredients(){
    return this.http.get<any>(this.api_url+"ingredient/findall");
  }

  getById(ingredientId:number) : Promise<any> {
    return this.http.get<any>(this.api_url+"ingredient/find/ingredientId").toPromise();
  }


}








