import { Component, OnInit } from '@angular/core';
import {MealService} from 'src/app/services/meal-service.service';
import {OrdersService} from 'src/app/services/orders.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
 
  allMeals:any[]=[];
  
  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getAllMeals();
  }

  async getAllMeals() {
    const response = await this.mealService.getMeals();
    this.allMeals = response;
    console.log(response);
    this.allMeals.forEach(element=>{
      this.getMealImage(element.id);
    });
      
  }
  async getMealImage(id) {
    const res = await this.mealService.findImgMeal(id);
    console.log(res);
      this.allMeals.forEach(element=>{
      if(element.imageId === res.id){
        element.img64 = res.image64;
        
     
      }
    })
/*    const img = res.image64;
    return img;*/
  }    
  }

  
 









 
 


  
