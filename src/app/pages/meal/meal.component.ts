import { Component, OnInit } from '@angular/core';
import {MealService} from 'src/app/services/meal-service.service';
import {OrdersService} from 'src/app/services/orders.service';
import {Observable} from 'rxjs';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
 
  allMeals=[];
  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getAllMeals();
  }

  async getAllMeals() {
    const response = await this.mealService.getMeals();
    this.allMeals = response;
    this.allMeals.forEach(element => {
      this.getMealImage(element.id)
      console.log(this.allMeals);
    });
  }
  async getMealImage(id_meal) {
    const res = await this.mealService.findImgMeal(id_meal);
    this.allMeals.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
        // console.log(this.menuList);

      }
    });
  }

    
    
  }

  
 









 
 


  
