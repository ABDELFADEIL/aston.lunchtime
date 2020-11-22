import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  ref;
  constructor(public dialogService: DialogService) { }

  

    ngOnInit() {
      this.items = [
        {label: 'Menu du jour', routerLink: ['/home']},
       /* {label: 'Plats', routerLink: ['/meal']},*/
        {label: 'Gestion', 
        items: [
          {label: 'Gestion plats', routerLink: ['/menu-management']} ,
          {label: 'Gestion commandes', routerLink: ['/client-orders']},
          {label: 'Gestion clients', routerLink: ['/clients-management']}
              ]},
        {label: 'Mon compte', routerLink: ['/user-account']}
                   ];
}

show() {
   this.ref = this.dialogService.open(LoginComponent, {
      width: '50%',
      
  });
  
}

ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}

}
