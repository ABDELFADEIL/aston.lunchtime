import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-clients-management',
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.css']
})
export class ClientsManagementComponent implements OnInit {
  users: any [];
  cols: any[];
  public user: any;
  status:  boolean= true;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.url.subscribe(() => {
      activatedRoute.snapshot;
      this.getAllUser();
    });
  }

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
    }, error => {
      console.log(error);
    })
  }

  onAddCredit(user: any) {
    this.user = user
  }
  editUser(user: any){
    this.user = user;
  }
  onDelete(id){
    let conf = confirm("Êtes vous sûr de vouloir supprimer?");
    if (conf) {
      this.userService.delete(id).subscribe(res => {
      }, error => {
        console.log(error);
      })
    }
  }

  changeStatus(user) {
    this.user = user
    this.userService.changeUserStatus(this.user).subscribe(res => {
        console.log(res);
        this.user = res
      console.log(this.user.status);
     this.router.navigateByUrl("/clients");
    }, error => {
        console.log(error)
      });
    console.log(this.user.status);

  }


  updateUser(){
    this.userService.update(this.user.id, this.user).subscribe(data=> {
      console.log(data);
      this.router.navigateByUrl("/clients");
    }, error => {
      console.log("error ///////////////////");
      console.log(error);
    })
  }
}
