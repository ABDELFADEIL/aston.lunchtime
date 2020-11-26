import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ConfirmationService} from "primeng/api";
import {FormBuilder, FormControl} from "@angular/forms";
import {User} from "../../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "email";
  password:string ="password";

  constructor() {}

  ngOnInit(): void {
  }

  onLogin() {
    console.log("on login");
    console.log(this.email, this.password);
  }
}
