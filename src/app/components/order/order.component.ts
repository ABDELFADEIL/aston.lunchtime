import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public orderService: OrdersService) { }

  ngOnInit(): void {
    
  }
  async commanderHo() {
    console.log(this.orderService.order);
    return await this.orderService.addOrder(this.orderService.order)
      .then(res => {
        console.log("res", res);
        this.orderService.order = undefined;
      })
      .catch(err => {
        console.log("err", err);
      });
  }

}
