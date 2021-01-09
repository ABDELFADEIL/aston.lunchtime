import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { OrdersService } from 'src/app/services/orders.service';
import { OrderComponent } from '../order/order.component';
import {absoluteFrom} from "@angular/compiler-cli/src/ngtsc/file_system";

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
    const isUser: boolean = this.authenticationService.isUser();
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

  logout() {
    this.authenticationService.logout();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    const returnURL = this.activatedRoute.queryParams['value'].returnUrl;
    this.router.navigateByUrl('/' + returnURL);
    window.location.reload();
  }

  onLogin() {
    const returnURL = this.router.url;
    console.log(returnURL)
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnURL } });
  }


  /* add Order*/
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







  show(position: string) {
    this.position = position;
    this.displayPosition = true;
    /*
    this.ref = this.dialogService.open(OrderComponent, {
      header: 'Votre panier',
      width: '40%',
      contentStyle: { "max-height": "600px", 'position': 'absolute'},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe(() => {
      if (true) {
        this.messageService.add({ severity: 'info', summary: 'panier', detail:  this.ordersService.order.quantity.length+""});
      }
    });
     */
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}




