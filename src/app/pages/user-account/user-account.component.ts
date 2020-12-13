import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  orders: boolean = true;
  jackpot: boolean = false;
  infos: boolean = false; 
  parameters:boolean = false;

  constructor(
  private user: UserService,
  public authenticationService: AuthenticationService,
  public userService: UserService
  ) { }

  ngOnInit(): void {
  }
  userAccountNavigate(navigate: string) {
    switch (navigate) {
      case 'orders':
        this.orders = true;
        this.jackpot = false;
        this.infos = false; 
        this.parameters = false;
        break;
      case 'jackpot':
        this.jackpot = true; 
        this.orders = false;
        this.infos = false; 
        this.parameters = false;
        break;
      case 'infos':
        this.infos = true; 
        this.jackpot = false; 
        this.orders = false;
        this.parameters = false;
        break;
        case 'parameters':
          this.parameters = true;
          this.jackpot = false; 
          this.orders = false;
          this.infos = false; 
        break;
      default:
        this.orders = true;
    }
  }

  onCancel() {
    this.userService.display = false;
  }

}

