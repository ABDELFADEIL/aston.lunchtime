import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from "../../services/authentication.service";
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';
import { element } from 'protractor';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  user: User = null;
  userOrders: any;
  public userForm: FormGroup;

  constructor(
  public authenticationService: AuthenticationService,
  public orderService: OrdersService,
  public userService: UserService

  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserAuthenticated();
    console.log(this.user);
    this.getOrdersForCurrentUser();
    this.getUserImg();
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
  private userFormInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      postalCode: new FormControl('', [
        Validators.required, Validators.minLength(4)]),
      town: new FormControl('', [
        Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [
        Validators.required, Validators.minLength(8)]),
      sex: new FormControl('', [
        Validators.required]),
    });
  }

  // get orders for logged-in user
  async getOrdersForCurrentUser() {
    if (this.user) {
      this.orderService.getOrderByUserId(this.user.id).subscribe(data => {
        this.userOrders = data;
      })
    }
   }
   getUserImg(){
    this.user = this.authenticationService.getUserAuthenticated();
    if (this.user){
      this.userService.findImgUser(this.user.id).then((res) => {
        this.user.image64 = res.image64;
      });
    }

  }

 findUserImg(id_user){
   const res = this.userService.findImgUser(id_user).then(res => {
   });
 }

}
