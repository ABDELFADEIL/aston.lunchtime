import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from "../../services/authentication.service";
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';
import { element } from 'protractor';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import { Order, Quantity } from 'src/app/models/order';

class Image {
  imagePath: string;
  image64: string | ArrayBuffer;
}

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  providers: [MessageService]
})
export class UserAccountComponent implements OnInit {
  orders: boolean = true;
  wallet: boolean = false;
  infos: boolean = false;
  parameters:boolean = false;
  user: User = null;
  userOrders: any;
  public userForm: FormGroup;
  update: boolean = false;
  private base64textString: string = null;
  success: boolean;
  message;
  public file: File;
  upload: boolean = true;
  detailVisible: number;
  totalePrice: number;

  constructor(
  public authenticationService: AuthenticationService,
  public orderService: OrdersService,
  public userService: UserService,
  private router: Router,
  private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserAuthenticated();
    this.userFormInit();
    console.log(this.user);
    this.getOrdersForCurrentUser();
    this.getUserImg();
    this.getPrice();
  }
// menu navigation
  userAccountNavigate(navigate: string) {
    switch (navigate) {
      case 'orders':
        this.orders = true;
        this.wallet = false;
        this.infos = false;
        this.parameters = false;
        break;
      case 'wallet':
        this.wallet = true;
        this.orders = false;
        this.infos = false;
        this.parameters = false;
        break;
      case 'infos':
        this.infos = true;
        this.wallet = false;
        this.orders = false;
        this.parameters = false;
        break;
        case 'parameters':
          this.parameters = true;
          this.wallet = false;
          this.orders = false;
          this.infos = false;
        break;
      default:
        this.orders = true;
    }
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
    });
  }

  // get orders for logged-in user
  async getOrdersForCurrentUser() {
    if (this.user) {
      this.orderService.getOrderByUserId(this.user.id).subscribe(data => {
        this.userOrders = data;
        console.log(data);
        return data;
      })
    }
   }
   getUserImg(){
    this.user = this.authenticationService.getUserAuthenticated();
    if (this.user){
      this.userService.findImgUser(this.user.id).then((res) => {
        this.user.image64 = res.image64;
      });
    }
  }

 findUserImg(id_user){
   const res = this.userService.findImgUser(id_user).then(res => {
   });
 }
 onUpdate(){
  this.update = true;
}

 updateUser() {
  console.log(this.userForm.value)
  this.userService.update(this.user.id, this.userForm.value).subscribe(data=> {
    console.log(data);
    this.update = false;
    this.router.navigateByUrl("/user-account");
  }, error => {
    console.log("error ///////////////////");
    console.log(error);
  })
}
  handleFileSelect(event){
    var file = event.currentFiles[0];
    this.file = file;
    if (file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
      this.upload = false;
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    console.log(binaryString);
    this.base64textString= binaryString;
    console.log(binaryString);
  }

editUserImg() {
  // update image
  let image: Image = new Image();
    image.image64 = this.user.image64;
    image.imagePath = ''
  if(this.base64textString && this.user.id){
    image.imagePath = 'img/'+this.file.name;
    image.image64 = this.base64textString;
    this.userService.updateImage(image, this.user.id).then(res =>{
      console.log(res);
      this.user.image64 = image.image64;
      this.upload = true;
    }).catch(
      error => {
        this.success = false
        console.log(error);
        console.log(this.success);
        this.message = 'il y a eu une erreur'
      }
    );
  }
  this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'})
}
editOuSaveImage(){
    console.log("editOuSaveImage ")
  let image: Image = new Image();
  if(this.base64textString && this.user['id']){
     image.imagePath = 'img/'+this.file.name;
     image.image64 = this.base64textString;
     this.userService.updateImage(image, this.user['id']).then(res =>{
       console.log(res);

       }).catch(
       error => {
         console.log(error);
       }
     );
   }
  }
  getPrice() {
    this.totalePrice = this.orderService.getOrderTotalPrice(this.userOrders.Quantity);
  }

}
