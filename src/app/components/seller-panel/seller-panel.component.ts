import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SellerSocialnetworkComponent } from '../seller-socialnetwork/seller-socialnetwork.component';

@Component({
  selector: 'seller-panel',
  templateUrl: './seller-panel.component.html',
  styleUrls: ['./seller-panel.component.css']
})
export class SellerPanelComponent {

  // @ViewChild('nietoContainer', { read: ViewContainerRef }) nietoContainer: ViewContainerRef;
  @ViewChild('butt') miEnlace!: ElementRef;
  @ViewChild('datosDesdeElPadre', { static: false }) datosDesdeElPadre: SellerSocialnetworkComponent;

  idproduct: number;
  currentPage: string = 'company';
  title: string = "";
  action: string = "";

  mostrarProductnew = false;
  mostrarProductEdit = false;
  mostrarProductList = false;
  mostrarSellerDetail = true;
  mostrarSellerEdit = false;
  mostrarSocial = false;
  mostrarTender = false;

  private clickListener: () => void;

  constructor(private router: Router, private renderer2: Renderer2) {
    this.title = "Profil komanije";
    this.action = "Ažuriraj podatke";
  }

  ngAfterViewInit() {
    const theLink = this.miEnlace.nativeElement;
    this.clickListener = this.renderer2.listen(theLink, 'click', () => {
      this.showSellerEdit();
    })
  }


  showSellerDetail() {
    this.mostrarProductList = false
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarSellerDetail = true
    this.mostrarTender = false;

    this.title = "Profil komanije";
    this.action = "Ažuriraj podatke";
    this.currentPage = "company";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerEdit();
    })
  }

  showSellerEdit() {
    this.mostrarSellerDetail = false
    this.mostrarSocial = false;
    this.mostrarSellerEdit = true;
    this.mostrarProductnew = false;
    this.mostrarTender = false;

    this.title = "Ažuriraj podatke kompanije";
    this.action = "Odustani";

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
    this.mostrarSocial = false;
    this.mostrarProductList = true;
    this.mostrarTender = false;

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
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarProductnew = true;
    this.mostrarTender = false;


    this.title = "Novi oglas"; //new ad
    this.action = "Odustani"; //cancel
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })

  }

  showProductEdit(idproduct: number) {
    this.mostrarProductList = false;
    this.mostrarSocial = false;
    this.mostrarProductEdit = true;
    this.mostrarProductnew = false;
    this.mostrarTender = false;

    this.title = "ažurirati oglas"; //new ad
    this.action = "Odustani";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })
    this.idproduct = idproduct;

  }

  showSocial() {


    this.mostrarProductList = false;
    this.mostrarProductEdit = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarProductnew = false;
    this.mostrarTender = false;
    this.mostrarSocial = true;



    this.title = "Društvene mreže"; //new ad
    this.action = "Edit";
    this.currentPage = "social";

    this.clickListener();

    const theLink = this.miEnlace.nativeElement;

    this.clickListener = this.renderer2.listen(theLink, 'click', () => {
      this.datosDesdeElPadre.estollegadelpadre = false;
      this.action = "Odustani";

      this.clickListener();
      this.clickListener = this.renderer2.listen(theLink, 'click', () => {
        this.datosDesdeElPadre.estollegadelpadre = true;
        this.action = "Edit";
      });

    })

  }

  showTender() {

    this.mostrarProductList = false;
    this.mostrarProductEdit = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarProductnew = false;
    this.mostrarSocial = false;
    this.mostrarTender = true;

    this.title = "Tender list"; //new ad
    this.action = "New tender";
    this.currentPage = "tender";
    
  }

  logout() {
    // localStorage.setItem("iduser", "0");
    // localStorage.setItem("email", "");
    localStorage.clear();
  }




}
