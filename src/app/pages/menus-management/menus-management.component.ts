import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu-service.service";
import {MealService} from "../../services/meal-service.service";
import {IngredientService} from "../../services/ingredient.service";
import {ConfirmationService, MessageService} from "primeng/api";

class Ingredient {
  id: number
  image64: any;
  label:string;
  status: number
  imageId: number;
}
class Image {
  imagePath: string;
  image64: string | ArrayBuffer;
}

@Component({
  selector: 'app-menus-management',
  templateUrl: './menus-management.component.html',
  styleUrls: ['./menus-management.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class MenusManagementComponent implements OnInit {
  colsIngredients: any[] = ["id", "image64", "label", "status"];
  menus: any [];
  meals: any[];
  ingredients: Ingredient [];
  ingredientDialog: boolean;
  ingredient: Ingredient;
  submitted: boolean;
  public file: File;
  statuses: any[];
  success: boolean;
  message;
  private base64textString: string = null;
  constructor(private menuService: MenuService,
              private mealService: MealService,
              private ingredientService: IngredientService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

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

  /*
  partie ingredinets
   */
  openNewIngredinet() {
    this.ingredient = new Ingredient();
    this.submitted = false;
    this.ingredientDialog = true;
    this.message = '';
  }

  // delete ingredient
  cols: any;
  deleteIngredient(ingredient: Ingredient) {
    console.log('delete')
    this.confirmationService.confirm({
      message: 'Vous voulez vraimment supprimer' + ingredient.label + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ingredientService.deleteIngredient(ingredient.id).subscribe(res => {
          console.log(res);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ingredient supprimé', life: 3000});
        }, error => { console.log(error)});
      }
    });
  }

  editIngredient(ingredient: Ingredient) {
    this.ingredient = {...ingredient};
    this.ingredientDialog = true;
  }


 async saveIngredient(){
   // this.done = true
    this.submitted = true;
    let image: Image = new Image();
    image.image64 = this.ingredient.image64;
    image.imagePath = ''
    const ingredientDTO = {
      description: this.ingredient['description'],
      label: this.ingredient.label,
      image: image
    }
    console.log(this.ingredient);
    if (this.ingredient.id) {
      console.log(this.ingredient);
      console.log(ingredientDTO);
      await this.ingredientService.updateIngredient(this.ingredient.id, ingredientDTO).then(res => {
        console.log(res);
       this.success = true;
        console.log(this.success);
      }).catch(
        error => {
          this.success = false
          console.log(error);
          console.log(this.success);
          this.message = 'il y a eu une erreur '
        }
      );

      } else if (this.base64textString){
      console.log('ajouter nouveau ingredient ');
      console.log(this.ingredient);
      ingredientDTO.image.imagePath = 'img/'+this.file.name;;
      ingredientDTO.image.image64 = this.base64textString;
      console.log(ingredientDTO);
      await this.ingredientService.addIngredient(ingredientDTO).then(res => {
        console.log(res);
        this.success = true;
        console.log(this.success);
      }).catch(
        error => {
          this.success = false
          console.log(error);
          console.log(this.success);
          this.message = 'il y a eu une erreur '
        }
      );
     // this.done = false
    }

    // update image
    if(this.base64textString && this.ingredient.id){
      image.imagePath = 'img/'+this.file.name;
      image.image64 = this.base64textString;
      await this.ingredientService.updateImage(image, this.ingredient.id).then(res =>{
        console.log(res);
        this.ingredient.image64 = image.image64;
        this.success = true;
        console.log(this.success);
      }).catch(
        error => {
          this.success = false
          console.log(error);
          console.log(this.success);
          this.message = 'il y a eu une erreur '
        }
      );
    }
    console.log(this.success);
    if (this.success){
      console.log('done ', this.success);
      this.ingredientDialog = false;
      this.submitted = false;
    }

  }
  hideDialog() {
    this.ingredientDialog = false;
    this.submitted = false;
  }

  handleFileSelect(event){
    var file = event.currentFiles[0];
    this.file = file;
    if (file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    console.log(binaryString);
    this.base64textString= binaryString;
    console.log(binaryString);
  }
}
