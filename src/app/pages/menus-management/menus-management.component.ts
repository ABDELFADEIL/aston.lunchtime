import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu-service.service";
import {MealService} from "../../services/meal-service.service";
import {IngredientService} from "../../services/ingredient.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {MealDTO} from "../../models/mealDTO";
import {MenuDTO} from "../../models/menuDTO";


class Ingredient {
  id: number
  image64: any;
  label:string;
  status: number
  imageId: number;
  description: any;
}
class Image {
  imagePath: string;
  image64: string | ArrayBuffer;
}
class AvailableForWeek {
  id: number
}

@Component({
  selector: 'app-menus-management',
  templateUrl: './menus-management.component.html',
  styleUrls: ['./menus-management.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class MenusManagementComponent implements OnInit {
  cols: any;
  colsIngredients: any[] = ["label", "image64", "status"];
  menus: any [];
  ingredients: Ingredient [];
  ingredientDialog: boolean;
  ingredient: Ingredient;
  ingredientsSelected: Ingredient[] = [];
  submitted: boolean;
  public file: File;
  statuses: any[];
  success: boolean;
  message;
  selectedAvailableForWeeks: AvailableForWeek [] = [];
  availableForWeeks: AvailableForWeek [] = [];
  indexAV: number
  categories= [ {id: 1, name: "viande"} ,{id: 3, name: "poission"},{id: 4, name: "vegeterian"},{ id: 5, name: "fast-food"},
                {id: 6, name: "fruit-mer"} ,{id: 7, name: "dessert"}, {id: 8, name: "boission"}, {id: 9, name:"entrée"}]
  private base64textString: string = null;
  // meals attributes
  colsMeals: any [] = ["label", "image64", "Status", "ingredients"];
  colsMenus: any [] =["Label","Image64","Availableweek","Price","Status"];
  meals: any[];
  mealDialog: boolean;
  menuDialog: boolean;
  meal: MealDTO;
  menu: MenuDTO;
  categorySelected: any;

  constructor(private menuService: MenuService,
              private mealService: MealService,
              private ingredientService: IngredientService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllMeals();
    this.getAllIngredients();
    this.getAllMenus();
    this.getAvailableForWeeks();
    console.log(this.availableForWeeks);
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
  }
   async getAllIngredients(){
     this.ingredients = await this.ingredientService.findAllIngredients();
     this.ingredients.forEach((ingredient:any) => {
       this.findIngredientImg(ingredient.id).then(res =>{
         ingredient.image64 = res.image64;
       })
     });
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
      description: this.ingredient.description,
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
    this.mealDialog = false;
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


  /*
  partie meals
   */
  openNewMeal() {
    this.meal = new MealDTO();
    this.submitted = false;
    this.mealDialog = true;
    this.message = '';
  }

  // delete meal

  deleteMeal(meal: MealDTO) {
    console.log('delete meal')
    this.confirmationService.confirm({
      message: 'Vous voulez vraimment supprimer' + meal.label + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mealService.deleteMeal(meal['id']).subscribe(res => {
          console.log(res);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'meal supprimé', life: 3000});
        }, error => { console.log(error)});
      }
    });
  }

  editMeal(mealDTO) {
      console.log(mealDTO)
    this.ingredientsSelected = [];
    this.categorySelected = null;
    this.meal = {...mealDTO};
    this.mealDialog = true;
    this.categorySelected = this.categories.filter(res => res.id == mealDTO.category);
    if (this.ingredients.length > 0){
      this.ingredients.forEach(res => {
        if (mealDTO && mealDTO['ingredients']){
          mealDTO['ingredients'].forEach(i => {
            if (i['id'] == res.id){
              this.ingredientsSelected.push(res);
            }
          })
        }

      });
    }

  }


  async saveMeal(){
    // this.done = true
    this.submitted = true;
    let image: Image = new Image();
    image.image64 = this.meal['image64'];
    image.imagePath = ''
    const mealDTO: MealDTO = new MealDTO();
    mealDTO.description = this.meal.description;
    mealDTO.label = this.meal.label;
    mealDTO.image = image;
    mealDTO.priceDF = this.meal.priceDF;
    if (this.selectedAvailableForWeeks){
      this.selectedAvailableForWeeks.forEach(weak => {
        mealDTO.availableForWeeks.push(weak.id);
      });
    } else {
      mealDTO.availableForWeeks = null;
    }

    mealDTO.category = this.meal.category;
    this.ingredientsSelected.forEach( (ingredient: any) => {
      mealDTO.ingredientsId.push(ingredient.id)
    })

    console.log(this.meal);
    if (this.meal['id']) {
      console.log(this.meal);
      console.log(mealDTO);
      await this.mealService.updateMeal(this.meal['id'], mealDTO).then(res => {
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

    } else {
      if (this.base64textString) {
      console.log('ajouter nouveau meal ');
      console.log(this.ingredient);
      mealDTO.image.imagePath = 'img/'+this.file.name;;
      mealDTO.image.image64 = this.base64textString;
      console.log(mealDTO);
      await this.mealService.addMeal(mealDTO).then(res => {
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
      }
      // this.done = false
    }

    // update image
    if(this.base64textString && this.meal['id']){
      image.imagePath = 'img/'+this.file.name;
      image.image64 = this.base64textString;
      await this.mealService.updateImage(image, this.meal['id']).then(res =>{
        console.log(res);
       // this.meal.image.image64 = image.image64;
        //this.meal['image64'] = image.image64;
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
      this.mealDialog = false;
      this.submitted = false;

    }

  }

 
  





   // partie manu*/

   deleteMenu(menu: MenuDTO) {
    console.log('delete menu')
    this.confirmationService.confirm({
      message: 'Vous voulez vraimment supprimer' + menu.label + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.menuService.deleteMenu(menu['id']).subscribe(res => {
          console.log(res);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'meal supprimé', life: 3000});
        }, error => { console.log(error)});
      }
    });
  }

  editMenu(menuDTO) {
      console.log(menuDTO);
    this.menu = {...menuDTO};
    this.menuDialog = true;
    if (this.availableForWeeks.length > 0){
      this.availableForWeeks.forEach(res => {
        if (menuDTO && menuDTO['availableForWeeks']){
          menuDTO['availableForWeeks'].forEach(i => {
            if (i['id'] == res.id){
              this.selectedAvailableForWeeks.push(res);
            }
          })
        }

      });
    }

  }

  async saveMenu(){
    // this.done = true
    this.submitted = true;
    let image: Image = new Image();
    image.image64 = this.menu['image64'];
    image.imagePath = ''
    const menuDTO: MenuDTO = new MenuDTO();
    menuDTO.description = this.menu.description;
    menuDTO.label = this.menu.label;
    menuDTO.image = image;
    menuDTO.priceDF = this.menu.priceDF;
    if (this.selectedAvailableForWeeks){
      this.selectedAvailableForWeeks.forEach(weak => {
        menuDTO.availableForWeeks.push(weak.id);
      });
    } else {
      menuDTO.availableForWeeks = null;
    }
    if (this.menu['id']) {     
      await this.menuService.updateMenu(this.menu['id'], menuDTO).then(res => {
        this.success = true;
        console.log(this.success);
      }).catch(
        error => {
          this.success = false
          console.log(error);
          this.message = 'il y a eu une erreur '
        }
      );

    } else {
      if (this.base64textString) {
      console.log('ajouter nouveau menu ');
      console.log(this.ingredient);
      menuDTO.image.imagePath = 'img/'+this.file.name;;
      menuDTO.image.image64 = this.base64textString;
      console.log(menuDTO);
      await this.menuService.addMenu(menuDTO).then(res => {
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
      }
    }

    // update image
    if(this.base64textString && this.meal['id']){
      image.imagePath = 'img/'+this.file.name;
      image.image64 = this.base64textString;
      await this.menuService.updateImage(image, this.menu['id']).then(res =>{
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
    }
    console.log(this.success);
    if (this.success){
      console.log('done ', this.success);
      this.menuDialog = false;
      this.submitted = false;

    }

  }
  getAvailableForWeeks() {
    for(let i = 0; i <= 51; i++){
      let weak: AvailableForWeek = new AvailableForWeek();
      weak.id = i+1
      this.availableForWeeks[i] = weak;
    }
  }

}
