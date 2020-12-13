import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  listeCommandesDays:any = [];
  cols: any[];
  detailVisible:number;
  constructor(private orderService: OrdersService) {

   }

  ngOnInit(): void {
    // this.getOrders();
    // this.getOrderById(1);
    // this.getOrderByUserId(1);
    this.getAllOrdersForAllUsersByDate(0,"2020-07-12");
    this.cols = [
      { field: 'date', header: 'date' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
  ];
    // this.getAllOrdersForAllUsersByDate(0,"2020-07-12");
  }
//recuperer toutes les commandes
  async getOrders() {
   const allOrders = await  this.orderService.getOrders()
   console.log("getOrders =>");
   console.log(allOrders);
  }
  //recuperer une commande avec un id
  async getOrderById(id:number) {
   const order = await  this.orderService.getOrderById(id)
   console.log("getOrderById =>");
   console.log(order);
  }
  async getOrderByUserId(id:number) {
   const userOrders = await  this.orderService.getOrderByUserId(id)
   console.log("getOrderByUserId =>");
   console.log(userOrders);
  }
  async getAllOrdersForAllUsersByDate(status?:number,beginDate?:string,endDate?:string) {
   const allOrdersByDate = await  this.orderService.getAllOrdersForAllUsersByDate(status,beginDate,endDate)
   this.listeCommandesDays = allOrdersByDate
   console.log("getAllOrdersForAllUsersByDate =>");
   console.log(allOrdersByDate);
  }
  showDetails(i) {
    this.detailVisible =i
    console.log("index => ");
    console.log(i);
  }
}
