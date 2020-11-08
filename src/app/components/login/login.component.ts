import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string;
  password : string;
  constructor(private authService:AuthenticationService, private router:Router)
  {
    /*
    // redirect to home if already logged in
    if (this.authService.jwtToken !=null) {
      this.router.navigate(['/home']);
    }
     */
  }

  ngOnInit(): void {
    /*
    if (this.authService.jwtToken != null) {
      this.router.navigate(['/home']);
    }
     */
  }


  onLogin() {
    console.log(this.email, this.password)
    this.authService.login(this.email, this.password)
      .subscribe(resp => {
          console.log(this.email, this.password)
          let jwtToken = resp.headers.get('Authorization');
          this.authService.saveToken(jwtToken);
          this.router.navigateByUrl('/home');
        },
        err => {
          console.log(err)
          this.router.navigateByUrl('/login');

        })
  }

}
