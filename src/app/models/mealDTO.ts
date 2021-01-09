

export class MealDTO {

  id: number;
  description;
  label;
  image: { imagePath, image64} = { imagePath: '', image64: ''}
  priceDF: number;
  availableForWeeks: any[] = [];
  ingredientsId: number [] = [];
  category: number;


}
