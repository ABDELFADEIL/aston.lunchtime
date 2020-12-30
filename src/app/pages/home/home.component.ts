import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { OrdersManagementComponent } from '../orders-management/orders-management.component';
import { MealService } from 'src/app/services/meal-service.service';
import { MatCardModule } from '@angular/material/card';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {User} from "../../models/user";
import {UserService} from 'src/app/services/user.service';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Order, Quantity } from 'src/app/models/order';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayBasic: boolean;
  menuList = [];
  date:boolean;
  user:any;
  constraint: any;
  paniers:[];
  order:Order;



  constructor(private menuService: MenuService,
    private ordersService: OrdersService,
    private ingredientService: IngredientService,
    private mealService: MealService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
      this.user = this.authenticationService.getUserAuthenticated();
      this.constraint= this.menuService.getConstraint();
      this.getMenuWeek();
      console.log(new Date());
  }


  async getMenuWeek() {
    const response = await this.menuService.getMenuToday();
    this.menuList = response;
    this.menuList.forEach(element => {
    this.getMenuImage(element.id)
    console.log(response);
    })

  }
  async getMenuImage(id_menu) {
    const res = await this.menuService.findImgMenu(id_menu);
    this.menuList.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
      //  console.log(this.menuList);

      }
    });
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


 /*   console.log(JSON.stringify(objMealCommande));
  }*/

 



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

  showInfo() {
    this.displayBasic = true;
}


 /* getOrderMeal(id_meal) {
    this.ordersService.orderMeal(id_meal);
  }*/


}



