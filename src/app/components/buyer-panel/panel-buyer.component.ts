import { Component, OnInit } from '@angular/core';
import { Buyer } from 'src/app/models/buyer';
import { Order } from 'src/app/models/order';
import { BuyerService } from 'src/app/services/buyer.service';
import { FEDERATIONS, federation, selectListByFed, select_city, select_fed } from 'src/app/services/helper';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'panel-buyer',
  templateUrl: './panel-buyer.component.html',
  styleUrls: ['./panel-buyer.component.css']
})
export class PanelBuyerComponent implements OnInit {

  currentPage: string = 'loading'; //orders - profile
  action: string = "Ažuriraj podatke";
  title: string = "";
  activeOrderList = false;
  saving: boolean = false;
  citiesToCombo: any[] = [];
  loading: boolean = false;

  orders: Order[];
  buyer: Buyer;
  iduser: number;
  
  federations:federation[]= FEDERATIONS;
  fed: number;
  city: number;

  constructor(private orderService: OrderService, private buyerService: BuyerService) { }

  ngOnInit(): void {

    this.showBuyerDetail();

  }

  showBuyerDetail() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      this.iduser = JSON.parse(usuarioString);

      this.buyerService.getByIdUser(this.iduser).subscribe(buy => {
        this.buyer = buy;

        this.fed = select_fed(this.buyer.user.federation).id;
        this.city = select_city(this.buyer.user.city).id;
        this.citiesToCombo = selectListByFed(this.buyer.user.federation);

        this.currentPage = "profile";
        this.title = "Profil";
      }, error => {
        this.currentPage = "profile";
        this.title = "Profil";
      });
    }

    this.showSidebar = false;

  }

  showOrderList() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      this.iduser = JSON.parse(usuarioString);
      this.orderService.getByIdBuyer(this.iduser).subscribe(buy => {
        this.orders = buy;
      });
    }
    this.currentPage = "orders";
    this.title = "Narudžbe";

    this.showSidebar = false;

  }

  showTenderTable() {

    this.title = "Lista vaših dodanih tendera"; //new ad
    this.currentPage = "tenderTable";
    this.showSidebar = false;

  }

  showNewTender() {
    this.title = "Dodaj tender";
    this.currentPage = "tenderForm";
  }

  logout() {
    localStorage.clear();
  }

  editForm() {
    if (this.action == "Ažuriraj podatke") { //update
      this.action = "Spremi";
    } else {
      this.saving = true;
      this.buyerService.createBuyer(this.buyer).subscribe(buy => {
        this.action = "Ažuriraj podatke"
        this.saving = false;
      }, error => {
        console.log(error);
        this.saving = false;
      })
    }
  }

  cancel() {
    this.action = "Ažuriraj podatke" //update
  }

  citiesCombo(event: Event) {
    let fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.buyer.user.federation = fed;
    this.citiesToCombo = selectListByFed(fed);
  }

  selectedCity(event: Event) {
    this.buyer.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

  showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
 

}
