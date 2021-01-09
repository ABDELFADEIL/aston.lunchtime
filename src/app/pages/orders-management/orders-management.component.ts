import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';


interface Recap {
  label: string,
  price: string,
  qty: number
}
@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css'],
  providers: [MessageService]
})
export class OrdersManagementComponent implements OnInit {

  listeCommandesDays: any = [];
  cols: any[];
  detailVisible: number;
  deleteIdx: number;
  listRecaps: Recap[];
  selectedListRecap: Recap[];
  selectedDate: string;
  selectedCommandeTotalPrice: number;

  position: string;

  constructor(private orderService: OrdersService, private userService: UserService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  async ngOnInit() {
    this.selectedDate = this.getTodayDate();
    // "2020-07-12"
    await this.getAllOrdersForAllUsersByDate(0, this.getTodayDate(), this.getTodayDate());
    this.createOrderRecap();
  }

  /////////////////////////////////////// FONCTIONS ACCEDANT A LA BASE DE DONNEE ///////////////////////////////////////


  /**recuperer toutes les commandes
   * 
   */
  async getOrders() {
    const allOrders = await this.orderService.getOrders()
    console.log("getOrders =>");
    console.log(allOrders);
  }
  /**recuperer une commande avec un id
   * 
   * @param id 
   */
  async getOrderById(id: number) {
    const order = await this.orderService.getOrderById(id)
    console.log("getOrderById =>");
    console.log(order);
  }
  /**
   * recuperer une commande avec l'id d'un utilisateur
   * @param id 
   */
  async getOrderByUserId(id: number) {
    const userOrders = await this.orderService.getOrderByUserId(id)
    console.log("getOrderByUserId =>");
    console.log(userOrders);
  }
  /**
   * recuperer toutes les commandes à entre 2 dates avec filtre sur le statut
   * @param status 
   * @param beginDate 
   * @param endDate 
   */
  async getAllOrdersForAllUsersByDate(status?: number, beginDate?: string, endDate?: string) {
    const allOrdersByDate = await this.orderService.getAllOrdersForAllUsersByDate(status, beginDate, endDate)
    this.listeCommandesDays = allOrdersByDate
    console.log("getAllOrdersForAllUsersByDate =>");
    console.log(allOrdersByDate);
  }

  /**
   * confirmer L'anulation de la commande id
   * @param id 
   */
  confirmDelete(id: number) {
    console.log("ID =>")
    console.log(id)
    let orderSelected = this.listeCommandesDays[id];
    if (orderSelected.id != null) {
      this.orderService.cancelAnOrderByOrderId(orderSelected.id).then(() => {
        if (orderSelected.quantity != null) {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
          console.log(orderSelected.user.id)
          console.log(this.getOrderTotalPrice(orderSelected.quantity))
          this.userService.creditUser(orderSelected.user.id, this.getOrderTotalPrice(orderSelected.quantity));
        }
        this.detailVisible = undefined;
        this.deleteIdx = undefined;
        this.listeCommandesDays.splice(id, 1)
      })
    }
  }

  /////////////////////////////////////// AUTRES FONCTIONS ///////////////////////////////////////


  /**
   * 
   * @param tabQuantity 
   */
  getOrderTotalPrice(tabQuantity) {
    return this.orderService.getOrderTotalPrice(tabQuantity);
  }
  /**
   * créer le recapitulatif des plats commandés avec la quantité
   */
  createOrderRecap() {
    let listmeal = []
    let listUnicName = []
    let listRecap = []
    for (let command of this.listeCommandesDays) {
      if (command.quantity != null) {
        for (let item of command.quantity) {
          let obj = { label: undefined, price: undefined, qty: undefined };
          if (!listUnicName.includes(item.meal.id)) {
            obj.label = item.meal.label
            obj.price = item.meal.priceDF
            obj.qty = 1
            listUnicName.push(item.meal.id)
            listRecap.push(obj);
          } else {
            for (let e of listRecap) {
              if (e.label === item.meal.label) {
                e.qty = e.qty + 1;
              }
            }
          }
        }
      }
    }
    this.listRecaps = listRecap;
    console.log(listRecap);
  }
  /**
   * afficher la demande de confirmation d'annulation d'une commande grace à son index
   * @param i 
   */
  askDelete(i) {
    this.selectedCommandeTotalPrice = undefined
    console.log("ID =>")
    console.log(i)
    let orderSelected = this.listeCommandesDays[i];
    console.log(orderSelected)
    if (this.deleteIdx !== i) {
      this.deleteIdx = i;
      this.detailVisible = undefined;
    } else {
      this.deleteIdx = undefined;
    }
  }
  /**afficher les détails d'une commande grace à son index
 * 
 * @param i 
 */
  showDetails(i) {
    if (this.detailVisible !== i) {
      this.detailVisible = i;
      this.deleteIdx = undefined;
      let orderSelected = this.listeCommandesDays[i];
      this.selectedCommandeTotalPrice = this.getOrderTotalPrice(orderSelected.quantity);

      console.log(orderSelected);
    } else {
      this.selectedCommandeTotalPrice = undefined;
      this.detailVisible = undefined;
    }
    console.log("index => ");
    console.log(i);
  }
  /**
  //  recuperer la date du jour au fromat yyyy-mm-dd
   */
  getTodayDate() {
    let date = new Date();
    const todayDate = formatDate(date, "yyyy-MM-dd", "en-US")
    console.log("daaaaate =>")
    console.log(todayDate)
    return todayDate;
  }
  /**
   * recuperer les commandes au jour selectionné
   */
  async findOrdersByDate() {
    console.log("DATE SELECTIONNEE =>")
    console.log(this.selectedDate)
    await this.getAllOrdersForAllUsersByDate(0, this.selectedDate, this.selectedDate);
    this.createOrderRecap();
  }
}
