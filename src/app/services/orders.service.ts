import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { end } from '@popperjs/core';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private api_url = "http://localhost:8080/lunchtime/";
  constructor(private http: HttpClient) { }
  d = new Date();
  date = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate() + '' + this.d.getHours() + '' + this.d.getMinutes();


  orderMenu(id_menu: number): Promise<any> {
    return fetch(this.api_url + id_menu, {
      method: "PUT"
    });
  }
  orderMeal(id_meal: number): Promise<any> {
    return fetch(this.api_url + id_meal, {
      method: "PUT"
    });
  }

  getAllOrders(): Promise<any> {
    return this.http.get<any>(this.api_url + "order/findall").toPromise();
  }
  getOrderById(id:number):Promise<any> {
    return this.http.get<any>(this.api_url + "order/find/" + id).toPromise();
  }
  getOrderByUserId(id:number):Promise<any> {
    return this.http.get<any>(this.api_url + "order/findallforuser/" + id).toPromise();
  }
  getAllOrdersForAllUsersByDate(status?:number,beginDate?:string,endDate?:string):Promise<any> {
    return this.http.get<any>(this.api_url + "order/findallbetweendateinstatus?status=" + status + "&beginDate=" + beginDate + "&endDate=" + endDate ).toPromise();
  }
}