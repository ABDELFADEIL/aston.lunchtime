import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu-service.service";
import {MealService} from "../../services/meal-service.service";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-menus-management',
  templateUrl: './menus-management.component.html',
  styleUrls: ['./menus-management.component.css']
})
export class MenusManagementComponent implements OnInit {
  cols: any[];
  menus: any [];
  meals: any[];
  ingredients: any;
  Delete: any;
  selectedProducts: any[];
  constructor(private menuService: MenuService,
              private mealService: MealService,
              private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.getAllMenus();
    this.getAllMeals();
    this.getAllIngredients();
    this.findIngredientImg(1);
  }
  async getAllMenus(){
    this.menus = await this.menuService.getMenus();
    this.menus.forEach((menu:any) => {
      this.findMenuImg(menu.id).then(res =>{
        menu.image64 = res.image64;
      })
    })
    console.log(this.menus)
  }
  async getAllMeals(){
    this.meals = await this.mealService.getMeals();
    this.meals.forEach((meals:any) => {
      this.findMealImg(meals.id).then(res =>{
        meals.image64 = res.image64;
      })
    })
    console.log(this.meals);
  }
   async getAllIngredients(){
     this.ingredients = await this.ingredientService.findAllIngredients();
     console.log(this.ingredients);
     this.ingredients.forEach((ingredient:any) => {
       this.findIngredientImg(ingredient.id).then(res =>{
         ingredient.image64 = res.image64;
       })
     })
     console.log(this.ingredients)
  }

  openNew() {

  }

  deleteSelectedProducts() {

  }

  editProduct(product: any) {

  }

  async findMenuImg(id_menu){
    let imgInfo;
    imgInfo = await this.menuService.findImgMenu(id_menu);
    return imgInfo;
  }

  async findMealImg(id_meals){
    let imgInfo;
    imgInfo = await this.mealService.findImgMeal(id_meals);
    return imgInfo;
  }

  async findIngredientImg(id_ingredient){
    let imgInfo;
    imgInfo = await this.ingredientService.findImgIngredient(id_ingredient);
    return imgInfo;
  }
}
