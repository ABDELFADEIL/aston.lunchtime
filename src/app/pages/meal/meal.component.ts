import { Component, OnInit } from '@angular/core';
import {MealService} from 'src/app/services/meal-service.service';
import {OrdersService} from 'src/app/services/orders.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
 
  mealList=[];
  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getMealsJour();
  }
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
        console.log(this.mealList);       
        
      }
    });
  }     
  getOrderMeal(id_meal){
    this.ordersService.orderMeal(id_meal);
   }  
    public enableMealBtn(id_meal){    
     var UTC_hours = new Date().getUTCHours()+2.5;
     if(UTC_hours<8 && UTC_hours>3.5){
       this.getOrderMeal(id_meal);       
     }
   }      
   commandTime= setInterval(this.enableMealBtn, 1000*60); 
 }
 







 
 


  
