import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  
  constructor() { }

  

    ngOnInit() {
      this.items = [
        {label: 'Accueil', routerLink: ['/home']},
        {label: 'Menu du jour', routerLink: ['/home']},
        {label: 'Gestion', 
        items: [
          {label: 'Gestion plats', routerLink: ['/menu-management']} ,
          {label: 'Gestion commandes', routerLink: ['/client-orders']},
          {label: 'Gestion clients', routerLink: ['/clients-management']}
              ]},
        {label: 'Mon compte', routerLink: ['/user-account']}
                   ];
}
}
