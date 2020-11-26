import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];
  ref;
  name = 'Angular';
  dlgref: any
  @ViewChild('cd') cd
  data: any[]
  display = false;
  constructor(private confirmationService: ConfirmationService) {}

  show() {
    this.display = true
    // this.dlgref = this.confirmationService.confirm({
    //     message:
    //       `<p>Are you sure that you want to perform this action?</p>
    //       <table *ngFor="let row in data">
    //         <tr>
    //         <td>{{row.name}}
    //       </table>`,
    //     accept: () => {
    //         //Actual logic to perform a confirmation
    //     }
    // });
  }



    ngOnInit() {
      this.items = [
        {label: 'Menu du jour', routerLink: ['/home']},
       /* {label: 'Plats', routerLink: ['/meal']},*/
        {label: 'Gestion',
        items: [
          {label: 'Gestion plats', routerLink: ['/menu-management']} ,
          {label: 'Gestion commandes', routerLink: ['/client-orders']},
          {label: 'Gestion clients', routerLink: ['/clients-management']}
              ]},
        {label: 'Mon compte', routerLink: ['/user-account']}
                   ];
}

  onAccept() {
    //onDragEnd
    console.log("accept ");
    this.confirmationService.accept.subscribe(accept => {
      console.log("accept dialog")
    })
    // this.display = false
  }

  onClose() {
    //onDragEnd
    console.log("close ");
    this.display = false
      console.log("accept dialog");
    // this.display = false
  }




}
