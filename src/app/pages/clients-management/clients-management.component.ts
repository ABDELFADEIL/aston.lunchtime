import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-clients-management',
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.css']
})
export class ClientsManagementComponent implements OnInit {
  users: any [];
  cols: any[];
  public user: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.cols = [
      {field: "firstname", header: "Prénom"},
      {field: "name", header: "Nom"},
      {field: "wallet", header: "Cagnotte"},
      {field: "status", header: "Statut"},
    ]
  }


  getAllUser(){
    this.userService.findAll().subscribe(res => {
      this.users = res;
      console.log(this.users);
    }, error => {
      console.log(error);
    })
  }

  onAddCredit(user: any) {
    this.user = user
    console.log(user)
  }
  editUser(user: any){
    this.user = user;
    console.log(user)
  }
  onDelete(id){
    let conf = confirm("Êtes vous sûr de vouloir supprimer?");
    if (conf) {
    console.log(id)
      this.userService.delete(id).subscribe(res => {
      console.log(res);
      }, error => {
        console.log(error);
      })
    }
  }
  onUpdate(user){
    console.log(user);
  }
}
