import { Time } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
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

  @Input() count:number =0; 
  
  displayBasic: boolean;
  mealList = [];
  menuList = [];
  date:boolean;
  user:any;
  constraint: any;
  order:any;
  submitted: boolean;
  success: boolean;
  message;
  

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
      this.getMealsWeek();
      console.log(new Date());
  }

/* menus de la semaine*/

  async getMenuWeek() {
    const response = await this.menuService.getMenuToday();
    this.menuList = response;
    this.menuList.forEach(element => {
    this.getMenuImage(element.id)
    console.log(response);
    })
  }

  /* image menu de la semaine*/

  async getMenuImage(id_menu) {
    const res = await this.menuService.findImgMenu(id_menu);
    this.menuList.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
      //  console.log(this.menuList);

      }
    });
  }

/* add Order*/
async commanderHo(meal_id){
      this.count++;  
    let obj = {  
    userId : this.user.id,
    constraintId: -1,
    quantity :[
      {
        quantity:this.count,
        mealId :meal_id,
        menuId: 0,     
      }
    ]  
    };
    console.log(JSON.stringify(obj));
    return await this.ordersService.addOrder(JSON.stringify(obj))
    .then(res=>{
      console.log("res",res);
    })
    .catch(err=>{
      console.log("err",err);
    });
  }
  

  


/* meals de la semaine*/

async getMealsWeek() {
  const response = await this.mealService.getMealWeek();
  this.mealList = response;
  this.mealList.forEach(element => {
    this.getMealImage(element.id);
    console.log(this.mealList);
  });
}

/* images de meals de la semaine*/

async getMealImage(id_meal) {
  const res = await this.mealService.findImgMeal(id_meal);
  this.mealList.forEach(element => {
    if (element.imageId === res.id) {
      element.img = res.image64;
      //console.log(this.mealList);

    }
  });

}

/* time constraint */

    getDate() {
      let date = new Date();
      let hour = date.getHours();
      let mins = date.getMinutes();
      if( hour<=10 && mins<=30 ){
        return true;
      }

    }

/* popup box inscription*/

  showInfo() {
    this.displayBasic = true;
  }
}



