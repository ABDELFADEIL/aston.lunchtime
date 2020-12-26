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
  currentPage:number = this.page;
  meals:any[]=[];
  pages: any[]=[];
  currentCategory = 1;
  categories=
    { 1: "viande" ,2:"poission",4:"fast-food",5:"fruit-mer",
    6:"dessert",7:"boission",8:"entrée"}




  constructor(private mealService: MealService, private ordersService: OrdersService) { }

  async ngOnInit(){
    this.allMeals = await this.getAllMeals();
    this.paginateMeals(this.page);
  }


  async getAllMeals() {
    const response = await this.mealService.getMeals();
    this.allMeals = response;
    this.allMeals.forEach(element => {
      this.getMealImage(element.id);
    });
    return response
  }

    async getMealImage(id) {
      const res = await this.mealService.findImgMeal(id);
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
      this.pages= new Array<number>(parseInt(totalPages)+1);
      if (0 > page_number){
        this.currentPage = 0;
      } else if (page_number > this.pages.length) {
        this.currentPage == this.pages.length - 1;
      } else {
        this.currentPage = page_number;
      }
      this.meals = this.allMeals.slice((this.currentPage-1) * 12, this.currentPage * 12);
      return this.meals;

    }

    OnMealPage(i){
      this.currentPage = i ;
      this.paginateMeals(this.currentPage);
    }

  searchByCategory(value: any) {
    this.currentCategory = value;
    console.log(value);
    if (value != 1){
      const  meals = this.allMeals.filter(meal => meal.category == value);
      this.meals = meals;
      console.log(meals);
    } else {
      this.paginateMeals(this.currentPage);
    }


  }
}