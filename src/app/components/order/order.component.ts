import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal-service.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  list: any[] = [];
  constructor(public orderService: OrdersService, public mealService: MealService) { }

  ngOnInit(): void {
    this.list = this.mealService.mealList
    console.log(this.list);
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

  retirerPlat(id) {
    let item = this.orderService.order.quantity[id]
    if (item.quantity > 1) {
      this.orderService.order.quantity[id].quantity += -1
    } else {
      this.orderService.order.quantity.splice(id, 1);
    }
  }
  emptyCart() {
    this.orderService.order.quantity = [];
  }
  getLabel(mealId) {
    for (let meal of this.list) {
      if (meal.id === mealId) {
        return meal.label;
      }
    }
  }
}
