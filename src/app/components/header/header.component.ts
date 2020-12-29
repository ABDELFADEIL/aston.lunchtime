import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import {AuthenticationService} from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  @ViewChild('cd') cd

  constructor(public authenticationService: AuthenticationService,
              private messageService: MessageService,
              public userService: UserService, private router: Router) {}




    ngOnInit() {
    const isAdmin: boolean = this.authenticationService.isAdmin();
    console.log(isAdmin)
      this.items = [
        {label: 'Menu du jour', routerLink: ['/home']},
       /* {label: 'Plats', routerLink: ['/meal']},*/
        {label: 'Gestion',visible: isAdmin,
        items: [
          {label: 'Gestion plats', routerLink: ['/menu-management'], visible: isAdmin} ,
          {label: 'Gestion commandes', routerLink: ['/orders-management'], visible: isAdmin},
          {label: 'Gestion clients', routerLink: ['/clients-management'], visible: isAdmin},
              ]},
              {label: 'Mon compte', routerLink: ['/user-account'], visible: isAdmin}
                   ];
}

  logout() {
    this.authenticationService.logout();
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
    window.location.reload();
  }
}

