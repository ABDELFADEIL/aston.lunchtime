import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {OrderListModule} from 'primeng/orderlist';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  constructor(private orderService: OrdersService) {

   }

  ngOnInit(): void {
    // this.getAllOrders();
    // this.getOrderById(1);
    // this.getOrderByUserId(1);
    this.getAllOrdersForAllUsersByDate(1,"2020-07-12");
  }
//recuperer toutes les commandes
  async getAllOrders() {
   const allOrders = await  this.orderService.getAllOrders()
   console.log(allOrders);
  }
  //recuperer une commande avec un id
  async getOrderById(id:number) {
   const order = await  this.orderService.getOrderById(id)
   console.log(order);
  }
  async getOrderByUserId(id:number) {
   const userOrders = await  this.orderService.getOrderByUserId(id)
   console.log(userOrders);
  }
  async getAllOrdersForAllUsersByDate(status?:number,beginDate?:string,endDate?:string) {
   const allOrdersByDate = await  this.orderService.getAllOrdersForAllUsersByDate(status,beginDate,endDate)
   console.log(allOrdersByDate);
  }

}
