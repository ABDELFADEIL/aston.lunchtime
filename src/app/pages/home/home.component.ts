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
  user:any;
  constraint: any;
  paniers:[];




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
      this.getMealsWeek();
      this.getMenuWeek();
      console.log(new Date());
  }


  async getMenuWeek() {
    const response = await this.menuService.getMenuToday();
    this.menuList = response;
    this.menuList.forEach(element => {
    this.getMenuImage(element.id)
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
 
/*  async orderMenuHomepage(id_menu,quantity:number,id_constraint) {
    //console.log('id_menu : '+id_menu);
    //console.log('quantity : '+quantity);
    console.log(this.user.id);
     var obj = {
      userId: this.user.id,
      menuId: id_menu,
      constraintId: 1,     
      
    }

    console.log(JSON.stringify(obj));
  }*/


  async orderMealHomepage(id_meal,quantity:number,id_constraint) {
    //console.log('id_menu : '+id_menu);
    //console.log('quantity : '+quantity);
    console.log(this.user.id);
    
    var obj = {
      user: this.user.id,
      mealId: id_meal,
      quantity: quantity,
   //   constraintId:id_constraint,
    }
  

    console.log(JSON.stringify(obj));
  }

    /*if(this.authenticationService.isUser && this.userService.findById !=null ){
    const order =await this.ordersService.addOrder(JSON.stringify(obj))
    .then(res=>{console.log("res:",res)})
    .catch(err=>{
    console.log("err:",err);
    })

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



