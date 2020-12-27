import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from "../../services/authentication.service";
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  orders: boolean = true;
  wallet: boolean = false;
  infos: boolean = false;
  parameters:boolean = false;
  user: User;
  userOrders: any;

  constructor(
  public authenticationService: AuthenticationService,
  public orderService: OrdersService,
  public userService: UserService

  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserAuthenticated();
    this.getOrdersForCurrentUser();
    this.findUserImg(this.user.id)
  }
// menu navigation
  userAccountNavigate(navigate: string) {
    switch (navigate) {
      case 'orders':
        this.orders = true;
        this.wallet = false;
        this.infos = false;
        this.parameters = false;
        break;
      case 'wallet':
        this.wallet = true;
        this.orders = false;
        this.infos = false;
        this.parameters = false;
        break;
      case 'infos':
        this.infos = true;
        this.wallet = false;
        this.orders = false;
        this.parameters = false;
        break;
        case 'parameters':
          this.parameters = true;
          this.wallet = false;
          this.orders = false;
          this.infos = false;
        break;
      default:
        this.orders = true;
    }
  }

  // get orders for logged-in user
  async getOrdersForCurrentUser() {

    this.orderService.getOrderByUserId(this.user.id).subscribe(data => {
      this.userOrders = data;
    })
   }
   getUserImg() {
    const user = this.authenticationService.getUserAuthenticated();
    const img = this.userService.findUserImag(this.user.id);
    //console.log(img);
  }

 findUserImg(id_user){
   const res = this.userService.findImgUser(id_user).then(res => {
   });
 }

}
