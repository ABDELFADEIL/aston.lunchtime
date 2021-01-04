import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { ButtonModule } from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {InputSwitchModule} from 'primeng/inputswitch';
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
import {OrderListModule} from 'primeng/orderlist';
import {JwtInterceptor} from "./helpers/jwt.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { UpdateClientComponent } from './pages/clients-management/update-client/update-client.component';
import {ListboxModule} from 'primeng/listbox';
import {FileUploadModule} from 'primeng/fileupload';
import {MultiSelectModule} from 'primeng/multiselect';




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
    DigitalClockComponent,
    UpdateClientComponent,
  ],
  imports: [

    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, FormsModule, AccordionModule, MenubarModule, InputTextModule,
    DynamicDialogModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CardModule, ButtonModule,
    CardModule, TableModule, ConfirmDialogModule, DialogModule, OverlayPanelModule, SplitButtonModule, ReactiveFormsModule, ButtonModule,
    DialogModule, TabViewModule, OrderListModule, ListboxModule, InputSwitchModule, FileUploadModule, MultiSelectModule,ConfirmDialogModule

  ],
  entryComponents: [
    LoginComponent
],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ConfirmationService,
    Title, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{



  ngOnInit(): void {

  }
}
