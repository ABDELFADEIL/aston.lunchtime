import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from "../api-url/url";
import {AuthenticationService} from "./authentication.service";
@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  constructor(private http:HttpClient, private authenticationService: AuthenticationService) { }


  findAllIngredients() : Promise<any> {
    return this.http.get<any>(URL+"ingredient/findall").toPromise();
  }

  getById(ingredientId:number) : Promise<any> {
    return this.http.get<any>(URL+"ingredient/find/ingredientId").toPromise();
  }

  findImgIngredient(ingredientId: number): Promise<any> {
    return this.http.get<any>(URL + "ingredient/findimg/" + ingredientId).toPromise();
  }

  deleteIngredient(ingredientId: number) {
    return this.http.delete(URL + "ingredient/delete/"+ingredientId);
  }

  async updateImage(image, ingredientId){
    return this.http.patch(URL+ 'ingredient/updateimg/'+ingredientId, image).toPromise()
      .then(res => {
        return res
      });
  }

  async updateIngredient(ingredientId, ingredient){
    return this.http.patch(URL+ 'ingredient/update/'+ingredientId, ingredient).toPromise()
      .then(res => {
        return res
      });
  }
  ///ingredient/add new
  async addIngredient(ingredientDTO) {
    return this.http.put(URL+ 'ingredient/add/', ingredientDTO).toPromise()
      .then(res => {
        return res
      });
  }
}








