export class MenuDTO  {
  id: number
  image64: any;
  label:string;
  status: number
  imageId: number;
  description: any;
  priceDF:number;
  mealIds:number[]=[];
  category:number;
  availableForWeeks: any[] = [];
  

}
class Image {
  imagePath: string;
  image64: string | ArrayBuffer;
}
class AvailableForWeek {
  id: number
}

