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

  constructor(
  private user: UserService,
  public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }
}

