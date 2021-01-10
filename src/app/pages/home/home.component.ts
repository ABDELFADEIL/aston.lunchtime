import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Order, Quantity } from 'src/app/models/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
   @Input() count: number = 0;

  displayBasic: boolean;
  mealList :any= [];
  menuList = [];
  cols: any[];
  date: boolean;
  user: any;
  constraint: any;
  order: Order = new Order();
  submitted: boolean;
  success: boolean;
  message;
  page: number = 1;
  pages: any[]=[];
  meals:any[]=[];
  quantity: Quantity = new Quantity();
  currentCategory: number = 0;
  /*créer categories*/
  categories=
    {0:"categories",1: "viande" ,2:"poission",4:"fast-food",5:"fruit-mer",
    6:"dessert",7:"boission",8:"entrée"}

  constructor(private menuService: MenuService,
    private ordersService: OrdersService,
    private ingredientService: IngredientService,
    private mealService: MealService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.user = this.authenticationService.getUserAuthenticated();
    this.constraint = this.menuService.getConstraint();
    this.mealList = await this.getMealsWeek();
    this.meals = this.mealList;
    this.getMenuWeek();
     console.log(new Date());
  }

  /**
   * menus de la semaine
   */ 

  async getMenuWeek() {
    const response = await this.menuService.getMenuWeek();
    this.menuList = response;
    this.menuList.forEach(element => {
      this.getMenuImage(element.id)
      console.log("getMenuWeek=>");
      console.log(response);
    })
  }

  /**
   * image menu de la semaine
   */

  async getMenuImage(id_menu) {
    const res = await this.menuService.findImgMenu(id_menu);
    this.menuList.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
        console.log("getMenuImage=>");
        console.log(res);    
      }
    });
  }

 /**
  * ajouter commande
  */  
  async commanderHo(meal_id) {
    this.count++;
    let obj = {
      userId: this.user.id,
      constraintId: -1,
      quantity: [
        {
          quantity: this.count,
          mealId: meal_id,
          menuId: 0,
        }
      ]
    };
    console.log(JSON.stringify(obj));
    return await this.ordersService.addOrder(JSON.stringify(obj))
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  /**
   * meals de la semaine
   */ 

  async getMealsWeek() {
    const response = await this.mealService.getMealWeek();
    this.mealList = response;

    // modifier
    this.mealService.mealList = response;
    console.log("REPONSE GET MEAL WEAK =>")
    console.log(response)
    console.log(this.mealService.mealList)
    this.mealList.forEach(element => {
      this.getMealImage(element.id);
      console.log("getMealsWeek");      
    });
    return response;
  }

  /**
   * images de meals de la semaine
   */

  async getMealImage(id_meal) {
    const res = await this.mealService.findImgMeal(id_meal);
    this.mealList.forEach(element => {
      if (element.imageId === res.id) {
        element.img = res.image64;
        console.log("getMealImage=>");
        console.log(res);
      }
    });
  }

  /**
   *  time constraint
   */  

  getDate() {
    let date = new Date();
    let hour = date.getHours();
    let mins = date.getMinutes();
    if (hour <= 10 && mins <= 30) {
      return true;
    }
  }

  /* popup box inscription*/

  showInfo() {
    this.displayBasic = true;
  }

  /**
   * Fonction pour recuperer une liste de class: Quantity a ajouter dans une class order
   *  lors de la validation de la commande (fais la meme chose que   addOrderToCart(id, isMeal)
   * @param id //id du meal ou du repas
   * @param isMeal // true si c'est un meal et false si c'est un menu
   */

  addTocart(id, isMeal) {

    let item = new Quantity();
    if (isMeal) {
      let idx = this.ordersService.quantities.findIndex(x => x.mealId === id);
      console.log(idx);
      if (idx != -1) {
        this.ordersService.quantities[idx].quantity += 1;
      } else {
        item.mealId = id;
        item.quantity = +1;
        this.ordersService.quantities.push(item);
      }
      console.log(this.ordersService.quantities);
    }
    else {
      let idx = this.ordersService.quantities.findIndex(x => x.menuId === id);
      if (idx != -1) {
        this.ordersService.quantities[idx].quantity += 1;
      } else {
        item.menuId = id;
        item.quantity = +1;
        this.ordersService.quantities.push(item);
      }
    }
    this.ordersService.order.quantity = this.ordersService.quantities;
    this.ordersService.order.userId = this.authenticationService.user.id;
  }

  /**
   * ajouter des meals au panier
   */
  addOrderToCart(id, isMeal) {
    let mealOrMenu: Quantity;
    if (!this.ordersService.order.userId) {
      this.ordersService.order.userId = this.authenticationService.user.id;
    }
    if (isMeal) {
      this.ordersService.order.quantity.forEach(m => {
        if (m.mealId === id) {
          mealOrMenu = m;
        }
      });
      if (mealOrMenu) {
        mealOrMenu.quantity = mealOrMenu.quantity + 1;
        console.log(mealOrMenu);
      } else {
        mealOrMenu = new Quantity();
        mealOrMenu.mealId = id;
        mealOrMenu.quantity = 1;
        this.ordersService.order.quantity.push(mealOrMenu);
      }
    } else {
      this.ordersService.order.quantity.forEach(m => {
        if (m.menuId === id) {
          mealOrMenu = m;
        }
      });
      if (mealOrMenu) {
        mealOrMenu.quantity = mealOrMenu.quantity + 1;
      } else {
        mealOrMenu = new Quantity();
        mealOrMenu.mealId = id;
        mealOrMenu.quantity = 1;
        this.ordersService.order.quantity.push(mealOrMenu);
      }
    }
    console.log(this.ordersService.order);
    
  }
   /**
    * afficher quantity de commander dans popup (button panier)
    */

  getMealQty(id) {
    if(this.ordersService.order){
      for (let q of this.ordersService.order.quantity) {
        if (q.mealId === id) {
          console.log(q.quantity);
          return q.quantity;
        }
      }
    }
  }

  /**
   *  afficher les meals par category
   */

  searchByCategory(value: any) {
    this.currentCategory = parseInt(value);
    console.log(value);
    if (value != 0){
      console.log(this.mealList);
      this.meals = this.mealList.filter(meal => meal.category === this.currentCategory);
      console.log(this.meals);
    } else{
      this.meals = this.mealList;
      console.log(this.mealList);
      }
  }
}
