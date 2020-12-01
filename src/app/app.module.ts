import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { ClientsManagementComponent } from './pages/clients-management/clients-management.component';
import { MenusManagementComponent } from './pages/menus-management/menus-management.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { MealComponent } from './pages/meal/meal.component';
import { ButtonModule } from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';



import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { CardModule, } from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TableModule } from 'primeng/table'
import { DialogModule } from 'primeng/dialog'
import {OverlayPanelModule} from "primeng/overlaypanel";
import {SplitButtonModule} from "primeng/splitbutton";
import {DigitalClockComponent} from "./components/digital-clock/digital-clock.component";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ClientOrdersComponent,
    OrdersManagementComponent,
    ClientsManagementComponent,
    MenusManagementComponent,
    UserAccountComponent,
    MealComponent,
    DigitalClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    MenubarModule,
    InputTextModule,
    DynamicDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CardModule,
    ButtonModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    OverlayPanelModule,
    SplitButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TabViewModule


  ],
  entryComponents: [
    LoginComponent
],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
