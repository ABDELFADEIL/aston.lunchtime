import { Component, OnInit } from '@angular/core';
import {MealService} from 'src/app/services/meal-service.service';
import {OrdersService} from 'src/app/services/orders.service';
import {Observable} from 'rxjs';
import {async} from "rxjs-compat/scheduler/async";
import { MenuService } from 'src/app/services/menu-service.service';
import { Order, Quantity } from 'src/app/models/order';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {UserService} from 'src/app/services/user.service';
import {User} from "../../models/user";



@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  mealList = [];
  constraint: any;
  order:Order;
  user:any;
  displayBasic: boolean;

  constructor(private mealService: MealService, private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private menuService: MenuService,) {
    
   }
   ngOnInit(): void {
    this.user = this.authenticationService.getUserAuthenticated();
    this.constraint= this.menuService.getConstraint();
    this.getMealsWeek();
    
}



commander(menu) {
console.log(menu);
this.order = new Order();
this.order.userId = this.authenticationService.user.id;
this.order.quantity = [];
menu.meals.forEach(meal=>{
const quantity: Quantity = new Quantity();
quantity.mealId = meal.id;
quantity.menuId = menu.id;
quantity.quantity =1;
this.order.quantity.push(quantity);
console.log(this.order);
})
this.ordersService.addOrder(this.order).subscribe(res => {
  console.log(res);

},error => {console.log(error)} )


}

  getDate() {
    let date = new Date();
    let hour = date.getHours();
    let mins = date.getMinutes();
    if( hour<=10 && mins<=30 ){
      return true;
    }

  }

/**
 *
 */
async getMealsWeek() {
  const response = await this.mealService.getMealWeek();
  this.mealList = response;
  this.mealList.forEach(element => {
    this.getMealImage(element.id);
    console.log(this.mealList);
  });
}
async getMealImage(id_meal) {
  const res = await this.mealService.findImgMeal(id_meal);
  this.mealList.forEach(element => {
    if (element.imageId === res.id) {
      element.img = res.image64;
      //console.log(this.mealList);

    }
  });
}
showInfo() {
  this.displayBasic = true;
}
/* getOrderMeal(id_meal) {
  this.ordersService.orderMeal(id_meal);
}*/


}


  
   
  




  



