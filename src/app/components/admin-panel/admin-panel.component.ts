import { Component } from '@angular/core';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  currentPage: string = 'home';
  title: string = "";
  // action: string = "";
  idseller:number;

  activeSellerList = false;
  activeBuyerList = false;
  activeSellerListToConfirm = false;
  activeSellerDetail = false;
  // mostrarSellerEdit = false;

  showSellerList() {
   
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeSellerList = true;

    this.title = "Companies";   
    this.currentPage = "companies";

  }

  showBuyerList() {

    this.activeSellerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerList = true;   

    this.title = "Customers";   
    this.currentPage = "customers";

  }

  showSellerListToConfirm() {

    this.activeSellerList = false;
    this.activeBuyerList = false;  
    this.activeSellerDetail = false;
    this.activeSellerListToConfirm = true; 

    this.title = "Customers to Confirm";   
    this.currentPage = "customersConfirmation";

  }

  showSellerDetail(idseller: number) {
   
    this.idseller = idseller;

    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerList = false;
    this.activeSellerDetail = true;

    this.title = "Companies details";   
    this.currentPage = "companies";
   

  }
  


  logout() {
    localStorage.clear();
  }

}
