import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { Buyer } from 'src/app/models/buyer';
import { Seller } from 'src/app/models/seller';
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
  user : Userr = new Userr();
  citiesToCombo: string[] = [];
  isSeller:boolean = false;
  public isMobile$: Observable<boolean>;
  modalShow=false;

  //modal values
  name="";
  result = "";

  @ViewChild('miModal') miModal: any;


  constructor(private buyerService : BuyerService, private router:Router, private categoryService: CategoryService){
    this.isMobile$ = fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth <= 768),
      startWith(window.innerWidth <= 768)
    );
  }

  ngOnInit(): void {
      
  }

  sellerSelected(event:Event){

      if((<HTMLInputElement>event.target).value=="seller"){
        this.isSeller=true;  
          
      }else{
        this.isSeller=false;        
      }

  }

  // selectedSub(event: Event) {
  //   this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  // }
 
  saveBuyer(){  
     
    this.buyerService.createBuyer(this.buyer).subscribe(dato => {
      if(dato){
        this.modalShow = true;
        this.name = dato.user.firstName;
        this.result="registracija završena";  
      } else{
        this.result="registracija nije završena";
      }
      
      //this.router.navigate(['login']);
    },error => {
      this.modalShow = true;
      console.log(error);
      this.result="registracija nije završena";
    });
  }

  saveSeller(){   
    this.buyerService.createSeller(this.seller).subscribe(dato=>{    
      
      if(dato){
        this.modalShow = true;
        this.name = dato.user.firstName;
        this.result="registracija završena";
      } else{
        this.result="registracija nije završena";
      }
      //this.router.navigate(['login']);
    },error =>{
      this.modalShow = true;
      this.result="registracija nije završena";
      console.log(error);
    }
   
     
     );
  }

  onSubmit(){  
    if(this.isSeller){      
      this.user.role.id = 2;
      this.seller.user = this.user;
      this.saveSeller();
    }else{
      this.user.role.id = 1;
      this.buyer.user = this.user;
      this.saveBuyer();
    }
    
  }

  // subcategoriesCombo(event: Event) {    
  //   this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);    
  //   this.product.idcategory = this.selectedCategory; 
    
  //   this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
  //     this.subcategories = subcategories;
  //   });
  // }

  citiesCombo(event: Event) {
    const fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.user.federation = fed;
    this.citiesToCombo = this.cities[fed];
  }


  selectedCity(event: Event) {
    this.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

  closeModal(){
    this.modalShow = false;
    this.router.navigate(['login']);
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
    [""],
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


