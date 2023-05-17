import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  constructor(private buyerService:BuyerService, private router: Router){}

  currentPage: string = 'home';
  title: string = ""; 
  idseller:number;
  idbuyer:number;
  buyer:Buyer;
  action:string = 'Protected'//'Save';
  citiesToCombo: string[] = [];

  activeSellerList = false;
  activeBuyerList = false;
  activeSellerListToConfirm = false;
  activeSellerDetail = false;
  activeBuyerDetail = false;
  activeTenderListToConfirm = false;
  activeTenderList = false;

  showSellerList() {

    this.activeSellerList = true;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = false;

    this.title = "Companies";   
    this.currentPage = "companies";
    this.showSidebar = false;

  }

  showBuyerList() {
   
    this.activeSellerList = false;
    this.activeBuyerList = true;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = false;

    this.title = "Customers";   
    this.currentPage = "customers";
    this.showSidebar = false;
  }

  showSellerListToConfirm() {
    
    this.activeSellerList = false;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = true;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = false;

    this.title = "Kompanijas to Confirm";   
    this.currentPage = "companyConfirmation";
    this.showSidebar = false;
  }

  showSellerDetail(idseller: number) {
   
    this.idseller = idseller;
    
    this.activeSellerList = false;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = true;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = false;

    this.title = "Companies details";   
    this.currentPage = "companies";
   

  }

  showBuyerDetail(idbuyer: number) {
   
    this.idseller = idbuyer;
    
    this.activeSellerList = false;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = true;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = false;

    this.title = "Customer details";   
    this.currentPage = "customers";

    this.buyerService.getByIdUser(idbuyer).subscribe(x=>{
      this.buyer = x;
      this.citiesToCombo = this.cities[this.buyer.user.federation];
    })
   
  }

  showTenderListToConfirm(){

    
    this.activeSellerList = false;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = true;
    this.activeTenderList = false;

    this.title = "Tender to Confirm";   
    this.currentPage = "tenderConfirmation";
    this.showSidebar = false;

  }

  showTenderList(){
    
    this.activeSellerList = false;
    this.activeBuyerList = false;
    this.activeSellerListToConfirm = false;
    this.activeSellerDetail = false;
    this.activeBuyerDetail = false;
    this.activeTenderListToConfirm = false;
    this.activeTenderList = true;

    this.title = "Posted tender";
    this.currentPage = "tenderposted"
    this.showSidebar = false;

  }
  
  logout() { 
    localStorage.clear();    
  }

  citiesCombo(event: Event) {
    let fed = parseInt((event.target as HTMLSelectElement)?.value);    

    if(fed<11){
      fed = fed-1;
    }else {
      fed = fed-2;
    }

    this.buyer.user.federation = fed;
    this.citiesToCombo = this.cities[fed];
  }

  selectedCity(event: Event) {
    this.buyer.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

  showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  federations: string[] = [
    "FEDERACIJA BiH",
    "UNSKO-SANSKI KANTON",
    "Posavski kanton",
    "Tuzlanski kanton",
    "Zeničko-dobojski kanton",
    "Bosansko-podrinjski kanton",
    "Srednjobosanski kanton",
    "Hercegovačko-neretvanski kanton",
    "Zapadnohercegovački kanton",
    "Kanton Sarajevo",
    "Kanton 10",
    "REPUBLIKA SRPSKA",
    "Banjalučka",
    "Dobojsko-Bijeljinska",
    "Sarajevsko-Zvornička",
    "Trebinjsko-Fočanska",
    "BRČKO DISTRIKT"
  ];

  cities: string[][] = [ 
   
    ["Bihać", "Bosanska Krupa", "Bosanski Petrovac", "Bužim", "Cazin", "Ključ", "Sanski Most", "Velika Kladuša"],
    ["Šamac", "Odžak", "Orašje"],
    ["Banovići", "Čelić", "Doboj Istok", "Gračanica", "Gradačac", "Kalesija", "Kladanj", "Lukavac", "Sapna", "Srebrenik", "Teočak", "Tuzla", "Živinice"],
    ["Breza", "Doboj Jug", "Kakanj", "Maglaj", "Olovo", "Tešanj", "Usora", "Vareš", "Visoko", "Zavidovići", "Zenica", "Žepče"],
    ["Goražde", "Ustikolina"],
    ["Bugojno", "Busovača", "Dobretići", "Donji Vakuf", "Fojnica", "Gornji Vakuf-Uskoplje", "Jajce", "Kiseljak", "Kreševo", "Novi Travnik", "Travnik", "Vitez"],
    ["Čapljina", "Čitluk", "Jablanica", "Konjic", "Mostar", "Neum", "Prozor", "Ravno", "Stolac"],
    ["Grude", "Ljubuški", "Posušje", "Široki Brijeg"],
    ["Hadžići", "Ilidža", "Ilijaš", "Sarajevo - Centar", "Sarajevo - Novi Grad", "Sarajevo - Novo Sarajevo", "Sarajevo - Stari Grad", "Trnovo", "Vogošća"],
    ["Bosansko Grahovo", "Drvar", "Glamoč", "Kupres", "Livno", "Tomislavgrad"],
 //   ["Banjalučka", "Dobojsko-Bijeljinska", "Sarajevsko-Zvornička", "Trebinjsko-Fočanska"],
    ["Kozarska Dubica", "Krupa na Uni", "Laktaši", "Mrkonjić Grad", "Novi Grad", "Oštra Luka", "Prijedor", "Prnjavor", "Ribnik", "Šipovo", "Srbac"],
    ["Lopare", "Modriča", "Pelagićevo", "Petrovo", "Šamac", "Stanari", "Teslić", "Ugljevik", "Vukosavlje"],
    ["Novo Goražde", "Osmaci", "Pale", "Rogatica", "Rudo", "Šekovići", "Sokolac", "Srebrenica", "Višegrad", "Vlasenica", "Zvornik"],
    ["Bileća", "Čajniče", "Foča", "Gacko", "Istočni Mostar", "Kalinovik", "Ljubinje", "Nevesinje", "Trebinje"],
    ["Brčko"]
  ]

}
