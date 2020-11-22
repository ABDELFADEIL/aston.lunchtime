import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private api_url="http://localhost:8080/lunchtime/";

  constructor(private http:HttpClient) { }


findAllMenu(){
  return this.http.get<any>(this.api_url+"menu/findall");
}
getMenuById(menuId:number) : Promise<any> {
  return this.http.get<any>(this.api_url+"menu/find/menuId").toPromise();
}

getMenuWeek() : Promise<any> {
return this.http.get<any>(this.api_url+"menu/findallavailablefortoday").toPromise();
  }
async getImage(id_menu:number): Promise<any> {
   return this.http.get<any>(this.api_url+"menu/findimg/"+id_menu).toPromise();

}

}