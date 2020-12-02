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
 
  allMeals: any =[];
  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    
  }

  
 

}







 
 


  
