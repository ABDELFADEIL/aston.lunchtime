import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormControl} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  message: string;


  constructor(public authenticationService: AuthenticationService, private messageService: MessageService) {}

  ngOnInit(): void {
  }

   onLogin(form: User) {
    this.authenticationService.login(form).subscribe(res => {
      let jwtToken = res.headers.get('authorization');
      this.authenticationService.saveToken(jwtToken);
      this.authenticationService.authenticated = true;
      this.authenticationService.display = false;
      this.message = "connexion réussie!"
    }, error => {
      this.message = "Le email ou le mot de passe est incorrect!"
      console.log(error);
    })

  }
}
