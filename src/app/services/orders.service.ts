import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { end } from '@popperjs/core';
import {AuthenticationService} from 'src/app/services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  jwtToken:string;

  private api_url = "http://localhost:8080/lunchtime/";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  d = new Date();

  date = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate() + '' + this.d.getHours() + '' + this.d.getMinutes();


 async getOrders():Promise<any>{
    return this.http.get<any>(this.api_url+"order/findall").toPromise();

 }
 async addOrder(obj:any): Promise<any>{
   return this.http.put<any>(this.api_url+"order/add", JSON.stringify(obj),
     {headers:new HttpHeaders({'authorization':this.authenticationService.jwtToken})})
     .toPromise();

  }




  getOrderById(id:number):Promise<any> {
    return this.http.get<any>(this.api_url + "order/find/" + id).toPromise();
  }
  getOrderByUserId(id:number):Promise<any> {
    return this.http.get<any>(this.api_url + "order/findallforuser/" + id).toPromise();
  }
  getAllOrdersForAllUsersByDate(status?:number,beginDate?:string,endDate?:string):Promise<any> {
   if (!beginDate){
     return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status="+status+"&endDate=" + endDate ,
       {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})} ).toPromise();
   } if (!endDate){
      return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status="+status+"&beginDate="+beginDate ,
        {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})} ).toPromise();
    }
    return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status="+status+"&beginDate="+beginDate+"&endDate=" + endDate ,
      {headers:new HttpHeaders({'Authorization':this.authenticationService.jwtToken})} ).toPromise();
  }
}
