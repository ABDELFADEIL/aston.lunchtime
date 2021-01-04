import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit, OnChanges {
 // @Input() user: any;
  @Input() notifyIUserProcessed: () => void;
  amount: number = 0;
  credit: boolean = false;
  update: boolean = false;
  public userForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userFormInit();

  }
  
  private _user; // private property _user
  // use getter setter to define the property
  get user(): any {
    return this._user;
  }

  @Input()
  set user(val: any) {
    this._user = val;
  }

  @Input() notifyItemProcessed: () => void;

  creditUser(form, id){
    console.log(id, form.amount);
    this.userService.creditUser(id, form.amount).then( res => {
      console.log(res);
      this.credit = false;
      this.router.navigateByUrl("/clients");
    }, error => {
      console.log(error);
    })
  }

  onCredit() {
    this.credit = true;
    this.update = false;
  }

  onUpdate(){
    this.update = true;
    this.credit = false;
  }

  updateUser() {
    console.log(this.userForm.value)
    this.userService.update(this.user.id, this.userForm.value).subscribe(data=> {
      console.log(data);
      this.update = false;
      this.router.navigateByUrl("/clients");
    }, error => {
      console.log("error ///////////////////");
      console.log(error);
    })
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
      status: new FormControl('', [
        Validators.required]),
      wallet: new FormControl('', [
        Validators.required])
    });
  }

  onCancel() {
    this.update = false;
    this.credit = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentUser: SimpleChange = changes.user;
    if(currentUser.currentValue){
      this.update = false;
      this.credit = false;
    }

  }
}
