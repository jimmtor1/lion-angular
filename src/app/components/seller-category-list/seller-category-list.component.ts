import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { IMG_PROFILE_URL } from 'src/app/services/helper';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-category-list',
  templateUrl: './seller-category-list.component.html',
  styleUrls: ['./seller-category-list.component.css']
})
export class SellerCategoryListComponent implements OnInit {

  sellers: Seller[] = [];
  category: string = "";
  categoryName: string[] = ["Građevinarstvo", "Sve za kuću", "Informatika i telekomunikacije", "Od glave do pete"];
  subcategoryName: String = "All";

  urlprof_img = `${IMG_PROFILE_URL}`;

  constructor(private providerService: SellerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProvidersFromSubcategory();
  }

  private getProvidersFromSubcategory(): void {
    this.route.params.subscribe(params => {

      this.category = this.categoryName[params['id'] - 1];

      if (params['idc'] == 0) {

        this.subcategoryName = "";
        this.providerService.getAllByCategoryId(params['id']).subscribe(data => {
          this.sellers = data;
        });

      } else {

        this.subcategoryName = this.subcategory[params['idc']];
        this.providerService.getAllBySubcategory(params['idc']).subscribe(data => {
          this.sellers = data;
        });

      }



      

    });

  }


  // federations: string[] = [    
  //   "FEDERACIJA BiH",
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
  //   "REPUBLIKA SRPSKA",
  //   "Banjalučka",
  //   "Dobojsko-Bijeljinska",
  //   "Sarajevsko-Zvornička",
  //   "Trebinjsko-Fočanska",
  //   "BRČKO DISTRIKT"
  // ];

  subcategory: string[] = [
    "",
    "Zemljani radovi",
    "Betonski radovi",
    "Armirano-betonski radovi",
    "Zidarski radovi",
    "Tesarski radovi",
    "Izolacijski radovi",
    "Krovopokrivački radovi",
    "Limarski radovi",
    "Bravarski radovi",
    "Stolarski radovi",
    "Keramički radovi",
    "Fasadski radovi",
    "Grijanje i hlađenje",
    "Hidroinstalacije",
    "Elektroinstalacije",
    "Strojarske instalacije",
    "Prozori",
    "Sobna vrata",
    "Ulazna vrata",
    "Roletne",
    "Kuhinje",
    "Stolovi i stolice",
    "Dnevni boravak namještaj",
    "Stilski namještaj",
    "Dječije sobe",
    "Kupaonski namještaj",
    "Predsoblja namještaj",
    "Led rasvjeta",
    "Lusteri",
    "Stropna rasvjeta i plafonjere",
    "Zidna rasvjeta",
    "Podne lampe",
    "Stolne lampe",
    "Ugradbena rasvjeta",
    "Vanjska rasvjeta",
    "Vaze",
    "Zidni sat",
    "Tapete",
    "Ostale dekoracije",
    "Klima uređaji",
    "Radijatori",
    "Kamini",
    "Peći",
    "Grijalice",
    "Jastuci",
    "Posteljina",
    "Prekrivači i deke",
    "Zavjese",
    "Tepisi",
    "Servis TV, audio i video uređaja",
    "Servis mobitela",
    "Servis kućanskih aparata",
    "Servis klima uređaja",
    "Servis računara",
    "Servis igraćih konzola",
    "Web hosting",
    "Web i software izrada",
    "Mreže serveri i telekomunikacije",
    "Mreže sigurnost",
    "Odjeća",
    "Obuća",
    "Radna odjeća i zaštitna oprema",
    "Dječija odjeća i obuća",
    "Dorbe i novčanici",
    "Naočale",
    "Nakit",

  ];

}
