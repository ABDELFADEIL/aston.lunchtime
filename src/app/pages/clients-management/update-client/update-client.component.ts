import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  @Input() user: any;
  amount: number = 0;
  credit: boolean = false;
  update: boolean = false;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }


  creditUser(form, id){
    console.log(id, form.amount);
    this.userService.creditUser(id, form.amount).then( res => {
      console.log(res);
      this.credit = false;
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
    console.log(this.user)
  }
}
