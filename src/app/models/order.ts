export class Order{
    userId:number;
    constraintId:number = 1;
    quantity:Quantity [] =[];
    
  }

  export class Quantity{
    quantity:number;
    mealId:number;
    menuId:number;
  }
  