import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MenuService} from 'src/app/services/menu-service.service';
import {CommandesService} from 'src/app/services/commande.service';
import {IngredientService} from 'src/app/services/ingredient.service';
import { OrdersManagementComponent } from '../orders-management/orders-management.component';
import { MealService } from 'src/app/services/meal-service.service';
import {CardModule} from 'primeng/card';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mealList=[];
  menuList =[];
  date;

  constructor(private menuService: MenuService,
    private commandeService: CommandesService,
    private ingredientService: IngredientService,
    private mealService: MealService
  ) { }

  ngOnInit(): void {
    this.getMealsJour();
    this.getMenuJour();

  }


  myVar = setInterval(this.myTimer,1000);
  myTimer(){
  var d = new Date();
  this.date = d.toLocaleTimeString;
}


  async getMenuJour(){
     const response= await this.menuService.getMenuWeek();
     this.menuList = response;
     this.menuList.forEach(element=>
      { this.getMenuImage(element.id)
    });
  }
  async getMenuImage(id_menu){
      const res = await this.menuService.getImage(id_menu);
      this.menuList.forEach(element=>{
        if(element.imageId === res.id){
          element.img = res.image64;
         // console.log(this.menuList);

        }
      });
    }

    getOrderMenu(id_menu){
     this.commandeService.orderMenu(id_menu);
    }
     public enableMenuBtn(id_menu){
      var UTC_hours = new Date().getUTCHours()+2.5;
      if(UTC_hours<8 && UTC_hours>3.5){
        this.getOrderMenu(id_menu);

      }
  }

  /**
   *
   */
  async getMealsJour(){
    const response= await this.mealService.getMealWeek();
    this.mealList= response;
    this.mealList.forEach(element=>{
      this.getMealImage(element.id)
    });
   }
   async getMealImage(id_meal){
    const res = await this.mealService.findImgMeal(id_meal);
    this.mealList.forEach(element=>{
      if(element.imageId === res.id){
        element.img = res.image64;
        //console.log(this.mealList);

      }
    });
  }
  getOrderMeal(id_meal){
    this.commandeService.orderMeal(id_meal);
   }
    public enableMealBtn(id_meal){
     var UTC_hours = new Date().getUTCHours()+2.5;
     if(UTC_hours<8 && UTC_hours>3.5){
       this.getOrderMeal(id_meal);
     }
   }
  commandTime = setInterval(this.enableMealBtn, 1000 * 60);

  }





