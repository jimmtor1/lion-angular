import { Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'seller-panel',
  templateUrl: './seller-panel.component.html',
  styleUrls: ['./seller-panel.component.css']
})
export class SellerPanelComponent {

  @ViewChild('nietoContainer', { read: ViewContainerRef }) nietoContainer: ViewContainerRef;
  @ViewChild('butt') miEnlace!: ElementRef;

  idproduct: number;
  currentPage: string = 'company';
  title: string = "";
  action: string = "";

  mostrarProductnew = false;
  mostrarProductEdit = false;
  mostrarProductList = false;
  mostrarSellerDetail = true;
  mostrarSellerEdit = false;

  constructor(private router: Router, private renderer2: Renderer2) {}

  ngAfterViewInit() {
    this.title = "Company profile";
    this.action = "Update data";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerEdit();
    })
  }

  
  showSellerDetail() {
    this.mostrarProductList = false
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarSellerEdit = false
    this.mostrarSellerDetail = true

    this.title = "Company profile";
    this.action = "Update data";
    this.currentPage = "company";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerEdit();
    })
  }

  showSellerEdit() {
    this.mostrarSellerDetail = false
    this.mostrarSellerEdit = true

    this.title = "Update Company data";
    this.action = "Cancel";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerDetail();
    })

  }

  showProductList() {

    this.mostrarSellerDetail = false;
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarSellerEdit = false
    this.mostrarProductList = true;

    this.title = "Vaši oglasi";
    this.action = "novi oglas";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductNew();
    })
  }

  showProductNew() {
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false
    this.mostrarProductnew = true;

    this.title = "Novi oglas"; //new ad
    this.action = "Cancel";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })

  }

  showProductEdit(idproduct: number) {
    this.mostrarProductList = false;
    this.mostrarProductEdit = true;

    this.title = "ažurirati oglas"; //new ad
    this.action = "Cancel";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })
    this.idproduct = idproduct;

  }

  logout() {
    localStorage.setItem("iduser", "0");
    localStorage.setItem("email", "");
  }


}
