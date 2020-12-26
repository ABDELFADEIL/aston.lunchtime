import { Component, OnInit } from '@angular/core';
import {MealService} from 'src/app/services/meal-service.service';
import {OrdersService} from 'src/app/services/orders.service';
import {Observable} from 'rxjs';
import {async} from "rxjs-compat/scheduler/async";


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  allMeals:any[]=[];

  cols: any[];
  public meal: any;
  page: number = 1;
  currentPage:number;
  meals:any[]=[];
  pages: any[]=[];

  categories=
{1: "viande" ,2:"poission",3:"vegeterian",4:"fast-food",5:"fruit-mer",
6:"dessert",7:"boission",8:"entrée"}



  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  async ngOnInit(){
    this.allMeals = await this.getAllMeals();
    this.paginateMeals(this.page);
  }


  async getAllMeals() {
    const response = await this.mealService.getMeals();
    this.allMeals = response;
    console.log(response);
    this.allMeals.forEach(element => {
      this.getMealImage(element.id);
    });
    return response
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

    paginateMeals(page_number) {
      const totalPages:any= this.allMeals.length/12;
      console.log(totalPages)
      console.log(this.allMeals.length/12);
      this.pages= new Array<number>(parseInt(totalPages)+1);
      this.meals = this.allMeals.slice((page_number-1) * 12, page_number * 12);
      return this.meals;

    }

    OnMealPage(i){
      this.currentPage = i ;
      this.paginateMeals(this.currentPage);
    }



  }



















