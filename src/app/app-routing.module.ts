import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import {ClientOrdersComponent} from './client-orders/client-orders.component';
import {SignupComponent} from './signup/signup.component';
import {ClientsManagementComponent} from './clients-management/clients-management.component';
import {MenusManagementComponent} from './menus-management/menus-management.component';
import {AuthGuard} from './helpers/authGuard';


const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data : {title:'Accueil'} },
  { path: 'login', component: LoginComponent},
  { path: 'account', component: AccountComponent },
  { path: 'client-orders', component: ClientOrdersComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'clients-management', component: ClientsManagementComponent },
  { path: 'menu-management', component: MenusManagementComponent },
  { path: 'signup', component: SignupComponent },

  /*
    { path: '',  redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent, data : {title:'Accueil'} , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'account', component: AccountComponent , canActivate: [AuthGuard]},
    { path: 'client-orders', component: ClientOrdersComponent , canActivate: [AuthGuard]},
    { path: 'signup', component: SignupComponent},
    { path: 'clients-management', component: ClientsManagementComponent , canActivate: [AuthGuard]},
    { path: 'menu-management', component: MenusManagementComponent , canActivate: [AuthGuard]},
    { path: 'signup', component: SignupComponent , canActivate: [AuthGuard]},
    */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
