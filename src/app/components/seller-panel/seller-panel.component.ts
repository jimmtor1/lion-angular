import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SellerSocialnetworkComponent } from '../seller-socialnetwork/seller-socialnetwork.component';
import { SellerService } from 'src/app/services/seller.service';

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
  mostrarTenderEdit = false;
  mostrarTenderApply = false;

  private clickListener: () => void;

  constructor(private router: Router, private renderer2: Renderer2, private sellerService: SellerService) {
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
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = true;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;


    this.title = "Profil komanije";
    this.action = "Ažuriraj podatke";
    this.currentPage = "company";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerEdit();
    })

    this.showSidebar = false;

  }

  showSellerEdit() {
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = true;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;

    this.title = "Ažuriraj podatke kompanije";
    this.action = "Odustani";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showSellerDetail();
    })

  }

  showProductList() {    
    
    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;    
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;
    this.mostrarProductList = true;
 

    this.title = "Vaši oglasi";
    this.action = "novi oglas";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;

    this.clickListener();    
    this.clickListener = this.renderer2.listen(theLink, 'click', () => {
      this.showProductNew();
    })

    this.showSidebar = false;
  }

  showProductNew() {

    this.mostrarProductnew = true;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;


    this.title = "Novi oglas"; //new ad
    this.action = "Odustani"; //cancel
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.clickListener(); 
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })

  }

  showProductEdit(idproduct: number) {
    this.mostrarProductnew = false;
    this.mostrarProductEdit = true;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;

    this.title = "ažurirati oglas"; //new ad
    this.action = "Odustani";
    this.currentPage = "adlist";

    const theLink = this.miEnlace.nativeElement;
    this.clickListener(); 
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })
    this.idproduct = idproduct;

  }

  showSocial() {

    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = true;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;

    this.title = "Društvene mreže"; //new ad
    this.action = "";
    this.currentPage = "social";

    const theLink = this.miEnlace.nativeElement;
    this.renderer2.listen(theLink, 'click', () => {
      this.showProductList();
    })


    // const theLink = this.miEnlace.nativeElement;

    // this.clickListener(); 
    // this.clickListener = this.renderer2.listen(theLink, 'click', () => {
    //   this.datosDesdeElPadre.estollegadelpadre = !this.datosDesdeElPadre.estollegadelpadre;
    //   if(this.datosDesdeElPadre.estollegadelpadre){
    //     this.action = "Odustani";
    //   }else{
    //     this.action = "Edit";
    //   }


    // this.clickListener();
    // this.clickListener = this.renderer2.listen(theLink, 'click', () => {
    //   this.datosDesdeElPadre.estollegadelpadre = true;
    //   this.action = "Edit";
    // });

    // })

    this.showSidebar = false;

  }

  showTenderTable() {

    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = true;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = false;

    this.title = "Lista vaših dodanih tendera"; //new ad
    this.action = "Dodaj tender";
    this.currentPage = "tender";

    const theLink = this.miEnlace.nativeElement;
    this.clickListener();
    
    this.clickListener=this.renderer2.listen(theLink, 'click', () => {      
      this.showTenderEdit();
    })
    this.showSidebar = false;

  }

  showTenderEdit() {

    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = true;
    this.mostrarTenderApply = false;

    this.title = "Novi tender";
    this.action = "Odustani";

    const theLink = this.miEnlace.nativeElement;
    this.clickListener();
    this.clickListener=this.renderer2.listen(theLink, 'click', () => {
      this.showTenderTable();
    })

  }

  showTenderApply() {

    this.mostrarProductnew = false;
    this.mostrarProductEdit = false;
    this.mostrarProductList = false;
    this.mostrarSellerDetail = false;
    this.mostrarSellerEdit = false;
    this.mostrarSocial = false;
    this.mostrarTender = false;
    this.mostrarTenderEdit = false;
    this.mostrarTenderApply = true;

    this.title = "Odobreni tenderi za apliciranje";
    this.action = "";
    this.currentPage = "tenderapply";

  }

  showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    // localStorage.setItem("iduser", "0");
    // localStorage.setItem("email", "");
    localStorage.clear();
  }



}
