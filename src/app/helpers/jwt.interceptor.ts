import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';
import {URL_SEC} from '../api-url/url_sec';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    if(this.authService.jwtToken==null)
      this.authService.jwtToken = this.authService.loadToken();
    const isLoggedIn = this.authService.jwtToken;
    const isApiUrl = request.url.startsWith(URL_SEC);
    if (isLoggedIn && isApiUrl) {
      request = request.clone(
        {
        setHeaders: {
          authorization: `Bearer ${this.authService.jwtToken}`
        }
      });
    }

    return next.handle(request);
  }
}
