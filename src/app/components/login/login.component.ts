import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  message: string;
  login: boolean = true;
  public userForm: FormGroup;
  userFormLongin: FormGroup;
  user: User = new class implements User {
    address: string;
    email: string;
    firstname;
    id: number;
    image_id: string;
    name: string;
    password: string;
    phone: string;
    postal_code: string;
    registration_date: string;
    sex: number;
    status;
    town: string;
    wallet: number;
  };

  constructor(public authenticationService: AuthenticationService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit(): void {
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
      wallet: new FormControl('', [
        Validators.required])
    });
    this.userFormLongin = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(4)])
    });


  }

   onLogin() {
     console.log(this.userFormLongin.value);
    this.user = this.userFormLongin.value;
    console.log(this.user);
    this.authenticationService.login(this.user).subscribe(res => {
      let jwtToken = res.headers.get('Authorization');
      this.authenticationService.saveToken(jwtToken);
      this.authenticationService.getUserAuthenticated();
      this.authenticationService.authenticated = true;
      this.authenticationService.display = false;
      this.message = "connexion réussie!"
    }, error => {
      this.message = "Le email ou le mot de passe est incorrect!"
      console.log(error);
    });

  }

  forgetPassword() {
    this.authenticationService.display = false;
    this.router.navigateByUrl('/login');
  }

  connectionNavigate(signin: string) {
    if (signin == "signin"){
      this.login = true;
    } else {
      this.login = false;
    }
  }

  onCancel() {
    this.authenticationService.display = false;
  }

  onRegister() {
    console.log(this.userForm.value);
    this.authenticationService.register(this.userForm.value).subscribe((res:any)=> {
      console.log(res);
      this.authenticationService.user = res;
      this.message = "Inscription avec succès! "
      this.login = true;
    }, error => {
      console.log(error);
    });


  }
}
