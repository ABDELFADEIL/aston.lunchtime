import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { end } from '@popperjs/core';
import {UserService} from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Input } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  @Input() count:number =0; 
  jwtToken: string;
  httpOption: any;
  constraint: any;
  order:any;
  user:any;
  

  private api_url = "http://localhost:8080/lunchtime/";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.httpOption = {
      'Authorization': this.authenticationService.jwtToken,
      'Content-Type': 'application/json',
    };
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



  addOrder(obj: any) {
    return this.http.put<any>(this.api_url + "order/add", obj)
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
   
  commander(id_meal) {
  this.count++;
  const obj = {  
  userId : this.user.id,
  constraintId : 1,
  quantity :{
    quantity:this.count,   
    mealId : id_meal,
    menuId: 0,     
  }  
}
  console.log(JSON.stringify(obj));
  return JSON.stringify(obj); 
}
}

