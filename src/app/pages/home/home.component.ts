import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MenuService} from 'src/app/services/menu-service.service';
import {CommandesService} from 'src/app/services/commande.service';
import {IngredientService} from 'src/app/services/ingredient.service';
import { OrdersManagementComponent } from '../orders-management/orders-management.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  menuList =[  ];
  date;
   
  constructor(private menuService : MenuService, private commandeService :CommandesService, private ingredientService: IngredientService) { }  

  ngOnInit():void {
  this.getMenuJour();  
  
  }

  myVar = setInterval(this.myTimer,1000);
  myTimer(){
  var d = new Date();
  this.date = d.toLocaleTimeString;  
} 


  async getMenuJour(){
     const response= await this.menuService.getMenuWeek();
     this.menuList = response;  
     this.menuList.forEach(element=>
      { this.getMenuImage(element.id)     
    });
  }
  async getMenuImage(id_menu){
      const res = await this.menuService.getImage(id_menu); 
      this.menuList.forEach(element=>{
        if(element.imageId === res.id){
          element.img = res.image64;
          console.log(this.menuList);         
          
        }
      });     
    }    

    getOrderMenu(id_menu){
     this.commandeService.orderMenu(id_menu);
    }  
     public enableMenuBtn(id_menu){    
      var UTC_hours = new Date().getUTCHours()+2.5;
      if(UTC_hours<8 && UTC_hours>3.5){
        this.getOrderMenu(id_menu);
        
      }
    }      
    commandTime= setInterval(this.enableMenuBtn, 1000*60); 
  }





