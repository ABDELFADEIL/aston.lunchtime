import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { end } from '@popperjs/core';
import {UserService} from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Input } from '@angular/core';
import { Order, Quantity } from '../models/order';
import {URL} from "../api-url/url";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  jwtToken: string;
  httpOption: any;
  constraint: any;
  user:any;
  quantities:Quantity[]= [];
  order: Order = new Order();
  messageInfo: string;


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
    return this.http.get<any>(URL + "order/findall").toPromise();

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
    return this.http.put<any>(URL + 'order/add', obj, this.httpOption).toPromise();
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
    return this.http.get<any>(URL + "order/find/" + id).toPromise();
  }
  getOrderByUserId(id: number) {
    return this.http.get<any>(URL + "order/findallforuser/" + id);
  }
  getAllOrdersForAllUsersByDate(status?: number, beginDate?: string, endDate?: string): Promise<any> {
    if (!beginDate) {
      return this.http.get<any>(URL + "order/findallbetweendateinstatus?status=" + status + "&endDate=" + endDate).toPromise();
    } if (!endDate) {
      return this.http.get<any>(URL + "order/findallbetweendateinstatus?status=" + status + "&beginDate=" + beginDate,
        ).toPromise();
    }
    return this.http.get<any>(URL + "order/findallbetweendateinstatus?status=" + status + "&beginDate=" + beginDate + "&endDate=" + endDate).toPromise();
  }
  /**
   * delete an order
   * @param orderId
   */
  cancelAnOrderByOrderId(orderId: number): Promise<any> {
    return this.http.patch<any>(URL + "order/cancel/" + orderId, null).toPromise();
  }

    getOrderTotalPrice(tabQuantity){
      let totalpirce = 0;
    for (let el of tabQuantity) {
      let qty = el.quantity
      let mealPrice = el.meal.priceDF
      let total = mealPrice * qty
      totalpirce += total;
    }
    return totalpirce;
    }

}

