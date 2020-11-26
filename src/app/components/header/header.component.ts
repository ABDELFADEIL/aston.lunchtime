import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  @ViewChild('cd') cd

  constructor(public authenticationService: AuthenticationService, private messageService: MessageService) {}




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


  logout() {
    this.authenticationService.logout();
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});

  }
}
