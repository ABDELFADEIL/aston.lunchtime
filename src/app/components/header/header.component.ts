import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService, DialogService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef;
  public items: MenuItem[];
  @ViewChild('cd') cd
  private snapshot: ActivatedRouteSnapshot;
  public position: string;
  public displayPosition: boolean;

  constructor(public authenticationService: AuthenticationService,
    private messageService: MessageService,
    public userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,private ordersService: OrdersService, public dialogService: DialogService) {
    this.snapshot = activatedRoute.snapshot;
    ref: DynamicDialogRef;
  }


  ngOnInit() {
    const isAdmin: boolean = this.authenticationService.isAdmin();
    const isUser: boolean = this.authenticationService.authenticated;
    console.log(isAdmin)
    this.items = [
      { label: 'Accueil', routerLink: ['/home'] },
      /* {label: 'Plats', routerLink: ['/meal']},*/
      {
        label: 'Admin', visible: isAdmin,
        items: [
          { label: 'Gestion plats', routerLink: ['/menu-management'], visible: isAdmin },
          { label: 'Gestion commandes', routerLink: ['/orders-management'], visible: isAdmin },
          { label: 'Gestion clients', routerLink: ['/clients-management'], visible: isAdmin },
        ]
      },
      { label: 'Mon compte', routerLink: ['/user-account'], visible: isUser }
    ];
  }
/**
 * se deconnecter
 */
  logout() {
    this.authenticationService.logout();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    const returnURL = this.activatedRoute.queryParams['value'].returnUrl;
    this.router.navigateByUrl('/' + returnURL);
    window.location.reload();
  }
/**
 * afficher le composant pour la connexion/ inscription
 */
  onLogin() {
    const returnURL = this.router.url;
    console.log(returnURL)
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnURL } });
  }

/**
 * add order
 */
  async commanderHo() {
    console.log(this.ordersService.order);
    return await this.ordersService.addOrder(this.ordersService.order)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  }
/**
 * afficher le panier
 * @param position 
 */
  show(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}




