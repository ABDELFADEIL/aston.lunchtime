export class Order{
    userId:number;
    constraintId:number = -1;
    quantity:Quantity [] =[];

  }

  export class Quantity{
    quantity:number = 0;
    mealId:number;
    menuId:number;
  }

