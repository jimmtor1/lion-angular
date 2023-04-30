import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Buyer } from 'src/app/models/buyer';
import { Order } from 'src/app/models/order';
import { BuyerService } from 'src/app/services/buyer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-panel-buyer',
  templateUrl: './panel-buyer.component.html',
  styleUrls: ['./panel-buyer.component.css']
})
export class PanelBuyerComponent implements OnInit {

  currentPage: string = 'profile'; //orders - profile
  action:string = "Update data";  
  title: string = "";
  activeOrderList = false;
  saving:boolean=false;
  citiesToCombo: string[] = [];

  orders: Order[];
  buyer: Buyer;
  iduser: number;

  constructor(private orderService: OrderService, private router: Router, private buyerService: BuyerService) { }

  ngOnInit(): void {

    this.showBuyerDetail();

  }

  showBuyerDetail() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      this.iduser = JSON.parse(usuarioString);

      this.buyerService.getByIdUser(this.iduser).subscribe(buy => {
        console.log(this.iduser);
        this.buyer = buy;        
        this.citiesToCombo = this.cities[this.buyer.user.federation];
      });
    }

    this.currentPage = "profile";

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

  }

  logout() {
    localStorage.clear
    this.router.navigate([''])
  }

  editForm(){    
    if(this.action=="Update data"){
      this.action="Save";
    }else{
      this.saving = true;
      this.buyerService.createBuyer(this.buyer).subscribe(buy=>{
        this.action="Update data"
        this.saving = false;
      },error => {
        console.log(error);
        this.saving = false;
      })
    }   
  }

  cancel(){
    this.action = "Update data"
  }

  citiesCombo(event: Event) {
    const fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.buyer.user.federation = fed;
    this.citiesToCombo = this.cities[fed];
  }

  selectedCity(event: Event) {
    this.buyer.user.city = parseInt((event.target as HTMLSelectElement)?.value);
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
