import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { OrdersService } from 'src/app/services/orders.service';
import { OrderComponent } from '../order/order.component';

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







  show() {
    const order:any = this.ordersService.order;
    this.ref = this.dialogService.open(OrderComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() => {
      if (true) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: "" });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}




