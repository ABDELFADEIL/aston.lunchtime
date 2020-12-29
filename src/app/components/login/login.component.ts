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
  forgetPassword: boolean = false;
  public userForm: FormGroup;
  userFormLongin: FormGroup;
  user: User = new  User()
  email: string;

  constructor(public authenticationService: AuthenticationService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit(): void {
   this.userFormInit();
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
      window.location.reload();
      // this.message = "connexion réussie!"
    }, error => {
      this.message = "Le email ou le mot de passe est incorrect!"
      console.log(error);
    });

  }

  onForgetPassword() {
    this.login = false;
    this.forgetPassword = true;
  }

  connectionNavigate(signin: string) {
    if (signin == "signin"){
      this.login = true;
    } else {
      this.login = false;
    }
  }

  onCancel() {
    this.forgetPassword = false;
    this.login = true;
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

  resendingPassword(form){
    this.authenticationService.resendPassword(form.email).subscribe(res => {
      this.message = "Un email vous a été envoyé avec votre mot de passe! ";
      this.login = true;
      this.forgetPassword = false;
    }, error =>{
      console.log(error);
    });
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
      wallet: new FormControl('', [
        Validators.required])
    });
  }
}
