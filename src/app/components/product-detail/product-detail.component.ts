import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  principalImage: string;
  producByProvider: Product[] = [];
  seller: Seller;


  constructor(private productService: ProductService, private route: ActivatedRoute, private sellerService: SellerService) {
    this.product = new Product();
    this.seller = new Seller();
    this.producByProvider = [];
  }

  ngOnInit(): void {

    this.principalImage = "";
    this.route.params.subscribe(param => {
      if (param['id'] != null) {
        this.productService.getById(param['id']).subscribe(result => {
          this.product = result;
          this.principalImage = "./assets/images/" + this.product.productImageList[0].idimage + this.product.productImageList[0].extension;


          this.sellerService.getById(this.product.idprovider).subscribe(pro => {
            this.seller = pro;
          });

          this.productService.getAllByProvider(this.product.idprovider).subscribe(result => {
            result.forEach(r => {
              this.producByProvider.push(r);
            })
          });

        })

      }
    });

  }

  chagePrincipalImage(position: number) {
    this.principalImage = "./assets/images/" + this.product.productImageList[position].idimage + this.product.productImageList[position].extension;
  }



  federations = [
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

  cities = [

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


