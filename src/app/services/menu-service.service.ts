import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getNumberOfCurrencyDigits } from '@angular/common';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {toPromise} from "rxjs-compat/operator/toPromise";
import {MenuDTO} from "../models/menuDTO";
import {URL} from "../api-url/url";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  jwtToken: string;


  constructor(private http:HttpClient, private authenticationService: AuthenticationService) { }

async getMenus():Promise<any>{
   return this.http.get<any>(URL+"menu/findall").toPromise();

}
getMenuById(menuId:number) : Promise<any> {
  return this.http.get<any>(URL+"menu/find/menuId",  null).toPromise();
}

getMenuToday() : Promise<[]> {
    console.log("getMenuToday : ")
return this.http.get<[]>(URL+"menu/findallavailablefortoday").toPromise();
  }
async findImgMenu(id_menu:number): Promise<any> {
   return this.http.get<any>(URL+"menu/findimg/"+id_menu).toPromise();

}
getMenuWeek():Promise<any>{
  return this.http.get<any>(URL+"menu/findallavailableforweek/2").toPromise();
}
/*/menu/findallavailableforweek/{weeknumber}*/
getConstraint():Promise<any>{
  return this.http.get<any>(URL+"constraint/findall").toPromise();
}
async updateImage(image, menuId){
  return this.http.patch(URL+ 'meal/updateimg/'+menuId, image).toPromise()
    .then(res => {
      return res
    });
}
async updateMenu(menuId: number, menu:MenuDTO){
  return this.http.patch(URL+ 'menu/update/'+menuId, menu).toPromise()
    .then(res => {
      return res
    });
}
deleteMenu(menutId: number) {
  return this.http.delete(URL + "menu/delete/"+menutId);
}
  ///meal/add new
  async addMenu(menuDTO: MenuDTO) {
    return this.http.put(URL+ 'menu/add/', menuDTO).toPromise()
     .then(res => {
        return res
      });
  }

}
