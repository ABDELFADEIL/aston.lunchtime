export class Order{
    userId:number;
    constraintId:number = 0;
    quantity: Quantity []= new Array<Quantity>();

  }

  export class Quantity{
    quantity:number = 0;
    mealId:number;
    menuId:number;
  }
