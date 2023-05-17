import { Component, OnInit, Provider } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { CategoryWithSellers, SellerByCategory } from 'src/app/models/seller-by-category';
import { CategoryService } from 'src/app/services/category.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'productos-inicio',
  templateUrl: './productos-inicio.component.html',
  styleUrls: ['./productos-inicio.component.css']
})
export class ProductosInicioComponent implements OnInit {

  categories: Category[] = [];
  sellerByCategory: SellerByCategory[] = [];
  categoryWithSellers: CategoryWithSellers[] = [];
  products:Product[]=[];

  constructor(private categoryService: CategoryService, private providerService: SellerService) { }

  private getProductsFromCategory() {

    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
      this.products = this.categories[4].products;     
    });

    this.providerService.getAllByCategory().subscribe(data => {
      this.sellerByCategory = data;
      this.organizar();
    });

  }


  organizar(){

   let seller1:Seller[]=[];
   let seller2:Seller[]=[];
   let seller3:Seller[]=[];
   let seller4:Seller[]=[];

    this.sellerByCategory.forEach(c=>{
      
      switch(c.category){
        case 1: seller1.push(c.provider);
        break;

        case 2: seller2.push(c.provider);
        break;

        case 3: seller3.push(c.provider);
        break;

        case 4: seller4.push(c.provider);
        break;

      }      
     
    })

    this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[0],seller1));
    this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[1],seller2));
    this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[2],seller3));
    this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[3],seller4));

  }

  ngOnInit(): void {
    this.getProductsFromCategory();
  }

  categoryNames: string[] = [
    "Građevinarstvo",
    "Sve za kuću",
    "Informatika i telekomunikacije",
    "Od glave do pete",
    "Trgovina",
  ]

  // federations: string[] = [
  //   // "FEDERACIJA BiH",
  //   "UNSKO-SANSKI KANTON",
  //   "Posavski kanton",
  //   "Tuzlanski kanton",
  //   "Zeničko-dobojski kanton",
  //   "Bosansko-podrinjski kanton",
  //   "Srednjobosanski kanton",
  //   "Hercegovačko-neretvanski kanton",
  //   "Zapadnohercegovački kanton",
  //   "Kanton Sarajevo",
  //   "Kanton 10",
  //   // "REPUBLIKA SRPSKA",
  //   "Banjalučka",
  //   "Dobojsko-Bijeljinska",
  //   "Sarajevsko-Zvornička",
  //   "Trebinjsko-Fočanska",
  //   // "BRČKO DISTRIKT"
  // ];

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
