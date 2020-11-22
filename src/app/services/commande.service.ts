import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private api_url="http://localhost:8080/lunchtime";
  constructor(private http: HttpClient) { }
  d = new Date();
  date = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate()+''+this.d.getHours()+''+this.d.getMinutes();
  

   orderMenu(id_menu:number):Promise<any>{
   return fetch(this.api_url+'/'+id_menu,{
     method:"PUT"
   });
}
orderMeal(id_meal:number):Promise<any>{
  return fetch(this.api_url+'/'+id_meal,{
    method:"PUT"
  });
}

}