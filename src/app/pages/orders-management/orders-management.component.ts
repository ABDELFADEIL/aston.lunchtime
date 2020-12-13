import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';


interface Recap {
  label: string,
  price: string,
  qty: number
}
@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  listeCommandesDays:any = [];
  cols: any[];
  detailVisible:number;
  listRecap:Recap[];
  selectedListRecap: Recap[];

  constructor(private orderService: OrdersService) {

   }

  ngOnInit(): void {
    // this.getOrders();
    // this.getOrderById(1);
    // this.getOrderByUserId(1);
    this.getAllOrdersForAllUsersByDate(0,"2020-07-12");
    this.cols = [
      { field: 'creationDate', header: 'creationDate' },
      { field: 'name', header: 'Name' },
      { field: 'creationTime', header: 'creationTime' },
      { field: 'quantity', header: 'Quantity' }
  ];
  //   this.cols = [
  //     { field: 'date', header: 'date' },
  //     { field: 'name', header: 'Name' },
  //     { field: 'category', header: 'Category' },
  //     { field: 'quantity', header: 'Quantity' }
  // ];
    // this.getAllOrdersForAllUsersByDate(0,"2020-07-12");
    this.createOrderRecap();
    console.log("tg");
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
  createOrderRecap() {
    let listmeal = []
    let listUnicName = []
    let listRecap = []
    for(let command of this.listeCommandesDays ) {
      if (command.quantity != null) {
        for(let item of command.quantity) {
          console.log(item)
          let obj = {label: undefined, price: undefined, qty: undefined};
          if(!listUnicName.includes(item.meal.id)) {
            obj.label = item.meal.label
            obj.price = item.meal.priceDF
            obj.qty = 1
            listUnicName.push(item.meal.id)
            listRecap.push(obj);
          } else {
            for (let e of listRecap){
              if(e.label === item.meal.label) {
                e.qty =e.qty +1;
              }
            }
          }
      }

        }
      }

    this.listRecap = listRecap;
    console.log(listRecap);



  }
}
