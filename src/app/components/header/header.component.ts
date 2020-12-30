import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import {AuthenticationService} from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  @ViewChild('cd') cd
  private snapshot: ActivatedRouteSnapshot;

  constructor(public authenticationService: AuthenticationService,
              private messageService: MessageService,
              public userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.snapshot = activatedRoute.snapshot;
  }




    ngOnInit() {
    const isAdmin: boolean = this.authenticationService.isAdmin();
    console.log(isAdmin)
      this.items = [
        {label: 'Accueil', routerLink: ['/home']},
       /* {label: 'Plats', routerLink: ['/meal']},*/
        {label: 'Gestion',visible: isAdmin,
        items: [
          {label: 'Gestion plats', routerLink: ['/menu-management'], visible: isAdmin} ,
          {label: 'Gestion commandes', routerLink: ['/orders-management'], visible: isAdmin},
          {label: 'Gestion clients', routerLink: ['/clients-management'], visible: isAdmin},
              ]},
              {label: 'Mon compte', routerLink: ['/user-account']}
                   ];
}

  logout() {
    this.authenticationService.logout();
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
    const returnURL = this.activatedRoute.queryParams['value'].returnUrl;
    this.router.navigateByUrl('/'+returnURL);
    window.location.reload();
  }

  onLogin(){
    const returnURL = this.router.url;
    console.log(returnURL)
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnURL }});
  }
}

