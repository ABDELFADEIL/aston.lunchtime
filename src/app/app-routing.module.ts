import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './helpers/authGuard';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { ClientsManagementComponent } from './pages/clients-management/clients-management.component';
import { HomeComponent } from './pages/home/home.component';
import { MealComponent } from './pages/meal/meal.component';
import { MenusManagementComponent } from './pages/menus-management/menus-management.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';


const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data : { title : 'Accueil' } },
  { path: 'meal', component: MealComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user-account', component: UserAccountComponent },
  { path: 'client-orders', component: ClientOrdersComponent },
  { path: 'clients-management', component: ClientsManagementComponent },
  { path: 'menu-management', component: MenusManagementComponent },
  { path: 'orders-management', component: OrdersManagementComponent }

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
