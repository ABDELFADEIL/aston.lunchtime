import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  todayDate: string = this.getTodayDate();

  position: string;

  constructor(private orderService: OrdersService, private userService: UserService, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  async ngOnInit() {
    // this.getOrders();
    // this.getOrderById(1);
    // this.getOrderByUserId(1);
    // "2020-07-12"
    await this.getAllOrdersForAllUsersByDate(0, "2020-07-12");
    this.createOrderRecap();
  }
  //recuperer toutes les commandes
  async getOrders() {
    const allOrders = await this.orderService.getOrders()
    console.log("getOrders =>");
    console.log(allOrders);
  }
  //recuperer une commande avec un id
  async getOrderById(id: number) {
    const order = await this.orderService.getOrderById(id)
    console.log("getOrderById =>");
    console.log(order);
  }
  // recuperer une commande avec l'id d'un utilisateur
  async getOrderByUserId(id: number) {
    const userOrders = await this.orderService.getOrderByUserId(id)
    console.log("getOrderByUserId =>");
    console.log(userOrders);
  }
  /**
   * recuperer toutes les commandes à entre 2 dates
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

  confirmDelete(id: number) {
    let orderSelected = this.listeCommandesDays[id];
    if (orderSelected.id != null) {
      this.orderService.cancelAnOrderByOrderId(orderSelected.id).then(() => {
        if (orderSelected.quantity != null) {
          this.userService.creditUser(orderSelected.user.id, this.getOrderTotalPrice(orderSelected.quantity));
        }
        this.detailVisible = undefined;
        this.deleteIdx = undefined;
        this.listeCommandesDays.splice(id, 1)
      })
    }
  }

  getOrderTotalPrice(tabQuantity) {
    let totalpirce = 0;
    for (let el of tabQuantity) {
      totalpirce += el.meal.priceDF;
    }
    return totalpirce;
  }


  /**
 * cancel an order with an order Id
 * @param orderId 
 */
  // cancelAnOrderByOrderId(orderId:number) {
  //   if(orderId != null){

  //     this.orderService.cancelAnOrderByOrderId(orderId)
  //   } 
  // }

  /**
   * credit an user
   * @param userId 
   * @param amount 
   */
  // creditUser(userId:number, amount:number) {
  //   this.userService.creditUser(userId,amount);
  // }



  showDetails(i) {
    if (this.detailVisible !== i) {
      this.detailVisible = i;
      this.deleteIdx = undefined;
    } else {
      this.detailVisible = undefined;
    }
    console.log("index => ");
    console.log(i);
  }
  test() {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  }
  createOrderRecap() {
    let listmeal = []
    let listUnicName = []
    let listRecap = []
    console.log("ssssssssssssssssssssssssssssssssssssssss");
    console.log(this.listeCommandesDays);
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

  doDelete(i) {
    if (this.deleteIdx !== i) {
      this.deleteIdx = i;
      this.detailVisible = undefined;
    } else {
      this.deleteIdx = undefined;
    }
    let date = this.getTodayDate();
    console.log(date);
    console.log("index => ");
    console.log(i);
  }

  // confirmDelete(i) {
  //   let orderSelected = this.listeCommandesDays[i];
  // this.cancelAnOrderByOrderId(orderSelected.id).then()
  // }


  getTodayDate() {
    let date = new Date();
    const todayDate = formatDate(date,"yyyy-MM-dd","en-US")
    console.log("daaaaate =>")
    console.log(todayDate) 
    return todayDate;
  }
  confirm2() {
    console.log("GGGGGGGGGG")
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
