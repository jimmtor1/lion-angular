import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from 'src/app/models/buyer';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { Userr } from 'src/app/models/userr';
import { BuyerService } from 'src/app/services/buyer.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  buyer : Buyer = new Buyer();
  seller : Seller = new Seller();
  userr : Userr = new Userr();
  selectedCategory: number;
  product: Product = new Product();
  subcategories: Subcategory[];
  citiesToCombo: string[] = [];

  isSeller:boolean = false;


  constructor(private buyerService : BuyerService, private router:Router, private categoryService: CategoryService){

  }

  ngOnInit(): void {    
  }

  sellerSelected(event:Event){

      if((<HTMLInputElement>event.target).value=="seller"){
        this.isSeller=true;
        this.userr.role = 2;
      }else{
        this.isSeller=false;
        this.userr.role = 1;
      }

  }

  selectedSub(event: Event) {
    this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  }
 
  saveBuyer(){
    console.log("metodo buyer");
    console.log(this.buyer);
    this.buyerService.createBuyer(this.buyer).subscribe(dato => {      
      this.router.navigate(['login']);
    },error => console.log(error));

  }

  saveSeller(){
    console.log("metodo saveseller");
    this.buyerService.createSeller(this.seller).subscribe(dato=>{      
      this.router.navigate(['login']);
    },error => console.log(error));
  }

  onSubmit(){
    console.log(this.isSeller)
    if(this.isSeller){      
      this.seller.user = this.userr;
      console.log(this.seller)
      this.saveSeller();
    }else{
      this.buyer.userr = this.userr;
      this.saveBuyer();
    }
    
  }

  subcategoriesCombo(event: Event) {    
    this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);    
    this.product.idcategory = this.selectedCategory; 
    
    this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  citiesCombo(event: Event) {
    const fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.product.federation = fed;
    this.citiesToCombo = this.cities[fed];
  }


  selectedCity(event: Event) {
    this.product.city = parseInt((event.target as HTMLSelectElement)?.value);
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


