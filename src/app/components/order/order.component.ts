import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from "../../models/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  list: any[] = [];
  messageInfo: string;
  constructor(public orderService: OrdersService, public mealService: MealService) { }

  ngOnInit(): void {
    this.messageInfo = undefined;
    this.getMealList();
  }

  /////////////////////////////////////// FONCTIONS DU PANIER ///////////////////////////////////////


  /**
   * validation de la commande
   */
  async commanderHo() {
    console.log(this.orderService.order);
    return await this.orderService.addOrder(this.orderService.order)
      .then(res => {
        console.log("res", res);
        this.orderService.order = new Order();
        this.messageInfo = "Votre commande a bien été prise en compte !"
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  /**
   * retirer une unité d'un plat
   * @param id 
   */
  retirerPlat(id) {
    let item = this.orderService.order.quantity[id]
    if (item.quantity > 1) {
      this.orderService.order.quantity[id].quantity += -1
    } else {
      this.orderService.order.quantity.splice(id, 1);
    }
  }
  /**
   * vider le panier
   */
  emptyCart() {
    this.orderService.order.quantity = [];
  }
  /**
   * recuperer le label du plat affiché
   * @param mealId 
   */
  getLabel(mealId) {
    for (let meal of this.list) {
      if (meal.id === mealId) {
        return meal.label;
      }
    }
  }
  /**
   * recuperer la liste des plats
   */
  getMealList() {
    this.mealService.getMealWeek().then(res => {
      this.list = res;
      console.log("MEAL LIST = >")
      console.log(this.list)
    })
  }
}