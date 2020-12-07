import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getNumberOfCurrencyDigits } from '@angular/common';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {toPromise} from "rxjs-compat/operator/toPromise";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  jwtToken: string;

  private api_url="http://localhost:8080/lunchtime/";

  constructor(private http:HttpClient, private authenticationService: AuthenticationService) { }

async getMenus():Promise<any>{
   return this.http.get<any>(this.api_url+"menu/findall").toPromise();

}
getMenuById(menuId:number) : Promise<any> {
  return this.http.get<any>(this.api_url+"menu/find/menuId",  null).toPromise();
}

getMenuToday() : Promise<[]> {
    console.log("getMenuToday : ")
return this.http.get<[]>(this.api_url+"menu/findallavailablefortoday").toPromise();
  }
async findImgMenu(id_menu:number): Promise<any> {
   return this.http.get<any>(this.api_url+"menu/findimg/"+id_menu).toPromise();

}
getMenuWeek():Promise<any>{
  return this.http.get<any>(this.api_url+"menu/findallavailableforweek/"+1).toPromise();
}
/*/menu/findallavailableforweek/{weeknumber}*/

}
