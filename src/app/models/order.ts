export class Order{
    userId:number;
    constraintId:number = 1;
    quantity: number;
    
  }

  export class Quantity{
    quantity:number;
    mealId:number;
    menuId:number;
  }