import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { end } from '@popperjs/core';
import {UserService} from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Input } from '@angular/core';
import { Quantity } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  jwtToken: string;
  httpOption: any;
  constraint: any;
  order:any;
  user:any;
  quantities:Quantity[]= []

  private api_url = "http://localhost:8080/lunchtime/";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authenticationService.jwtToken
      })
    }
    this.user = this.authenticationService.getUserAuthenticated();
  }

  d = new Date();

  date = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate() + '' + this.d.getHours() + '' + this.d.getMinutes();


  async getOrders(): Promise<any> {
    return this.http.get<any>(this.api_url + "order/findall").toPromise();

  }
  /*async addOrder(obj:any): Promise<any>{
    return this.http.put<any>(this.api_url+"order/add", JSON.stringify(obj),
      {headers:new HttpHeaders({'authorization':this.authenticationService.jwtToken,
                                 'Content-Type':'application/json',
                                 'dataType': "json",

                               })})
      .toPromise();

   }*/
  /*async addOrder(obj:any){
  return this.http.put<any>(this.api_url+"order/add",
    {
      headers:new HttpHeaders({'authorization':this.authenticationService.jwtToken,
                               'Content-Type':'application/json',
                                'dataType': "json",
                                'body': JSON.stringify(obj),
                                'method':"PUT",
                             })})

 }*/



  async addOrder(obj: any): Promise<any> {
    return this.http.put<any>(this.api_url + 'order/add', obj, this.httpOption).toPromise();
    /*return this.http.put<any>(this.api_url + "order/add", obj,
   { 
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':this.authenticationService.jwtToken 
          
      })
  }) .toPromise();*/
    /*obj,this.httpOption)*/
  }
  getOrderById(id: number): Promise<any> {
    return this.http.get<any>(this.api_url + "order/find/" + id).toPromise();
  }
  getOrderByUserId(id: number) {
    return this.http.get<any>(this.api_url + "order/findallforuser/" + id);
  }
  getAllOrdersForAllUsersByDate(status?: number, beginDate?: string, endDate?: string): Promise<any> {
    if (!beginDate) {
      return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status=" + status + "&endDate=" + endDate,
        { headers: new HttpHeaders({ 'Authorization': this.authenticationService.jwtToken }) }).toPromise();
    } if (!endDate) {
      return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status=" + status + "&beginDate=" + beginDate,
        { headers: new HttpHeaders({ 'Authorization': this.authenticationService.jwtToken }) }).toPromise();
    }
    return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status=" + status + "&beginDate=" + beginDate + "&endDate=" + endDate,
      { headers: new HttpHeaders({ 'Authorization': this.authenticationService.jwtToken }) }).toPromise();
  }
  /**
   * delete an order
   * @param orderId
   */
  cancelAnOrderByOrderId(orderId: number): Promise<any> {
    return this.http.patch<any>(this.api_url + "order/cancel/" + orderId, null).toPromise();
  }
   

}

