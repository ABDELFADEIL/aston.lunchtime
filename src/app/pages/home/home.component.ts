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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayBasic: boolean;
  mealList = [];
  menuList = [];
  date:boolean;
  jwtToken:string;
  


  constructor(private menuService: MenuService,
    private ordersService: OrdersService,
    private ingredientService: IngredientService,
    private mealService: MealService,
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getMealsJour();
    this.getMenuJour();
  //  this.token();
    // ici c'est l'utilisateur authentifié
    console.log(this.authenticationService.isUser);
    console.log(new Date());
  }

   token(){
    this.jwtToken= this.authenticationService.getToken();
  }
  

  async getMenuJour() {
    const response = await this.menuService.getMenuToday();
    this.menuList = response;
    this.menuList.forEach(element => {
      this.getMenuImage(element.id)
    });
  }
  async getMenuImage(id_menu) {
    const res = await this.menuService.getImage(id_menu);
    this.menuList.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
        // console.log(this.menuList);

      }
    });
  }

  async orderHomepage(obj) {
    let or =await this.ordersService.order(obj);
    console.log(or)
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
  async getMealsJour() {
    const response = await this.mealService.getMealWeek();
    this.mealList = response;
    this.mealList.forEach(element => {
      this.getMealImage(element.id)
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



