import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnInit {

  @Input() id: number;

  seller: Seller = new Seller();
  selectedCategory: number;
  subcategories: Subcategory[] = [];
  iduser: number;
  image: string;


  loading: boolean = true;

  constructor(private categoryService: CategoryService, private sellerService: SellerService, private router: Router, private route: ActivatedRoute) {
    this.loading = true;
  }

  ngOnInit(): void {

    const roleString = localStorage.getItem("role");
    if (roleString) { //if is role admin
      if (JSON.parse(roleString) == 3) {
        this.iduser = this.id;
        this.getSeller();
      } else { //if role is different admin

        const usuarioString = localStorage.getItem("iduser");
        if (usuarioString) {

          if (JSON.parse(usuarioString) > 0) {
            this.iduser = JSON.parse(usuarioString);
            this.getSeller();
          }
        }
      }
    } else {

      this.route.params.subscribe(param => {

        if (param['id'] != null) {
          this.iduser = param['id'];
          this.getSeller();
        }

      })

    }



  }

  getSeller() {

    this.sellerService.getById(this.iduser).subscribe(sellerBd => {
      this.seller = sellerBd;
      this.loading = false;
      this.image = './assets/images/' + this.seller.image;

      this.seller.providerSubcategoryList.forEach(p => {

        this.subcategories.push(p.subcategory);

      })

    });
  }

  subcategoriesCombo(event: Event) {
    this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);
    //this.product.idcategory = this.selectedCategory; 

    this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  selectedSub(event: Event) {
    // this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  }

  getSellerbyidseller() {
    this.sellerService.getById(this.iduser).subscribe(sellerBd => {
      this.seller = sellerBd;
      this.loading = false;
      this.image = './assets/images/' + this.seller.image;

      this.seller.providerSubcategoryList.forEach(p => {

        this.subcategories.push(p.subcategory);

      })

    });
  }

  federations: string[] = [
    //"FEDERACIJA BiH",
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
    //"REPUBLIKA SRPSKA",
    "Banjalučka",
    "Dobojsko-Bijeljinska",
    "Sarajevsko-Zvornička",
    "Trebinjsko-Fočanska",
   // "BRČKO DISTRIKT"
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
