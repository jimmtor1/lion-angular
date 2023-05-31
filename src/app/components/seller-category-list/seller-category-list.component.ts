import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { FEDERATIONS, IMG_PROFILE_URL, federation, selectListByFed } from 'src/app/services/helper';
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
  loading = true;
  loadingnewpage = false;
  federations: federation[] = FEDERATIONS;
  citiesToCombo: any[] = [];
  // fed: federation | null;

  fed: number = 0;
  city: number = 0;
  idsubcategory: number;
  idcategory: number;
  page = 0;

  urlprof_img = `${IMG_PROFILE_URL}`;

  constructor(private providerService: SellerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProvidersFromSubcategory();
  }

  private getProvidersFromSubcategory(): void {
    this.route.params.subscribe(params => {

      this.idcategory = parseInt(params['id']);
      this.category = this.categoryName[params['id'] - 1];

      this.idsubcategory = parseInt(params['idc']);
      this.subcategoryName = this.subcategory[params['idc']];

      if (this.idsubcategory == 0 && this.idcategory > 0) {
        this.providerService.getAllByCategoryId(this.idcategory).subscribe(data => {
          this.sellers = data;
          this.loading = false;
        }, error => { this.loading = false; });

      } else if (this.idsubcategory !== 0) {
        this.providerService.getAllBySubcategory(this.idsubcategory).subscribe(data => {
          this.sellers = data;
          this.loading = false;
        }, error => { this.loading = false; });

      } else {
        this.providerService.getAllPageable(this.page).subscribe(data => {
          this.sellers = data.content;
          this.loading = false;
        }, error => { this.loading = false; });

      }

    });

  }

  citiesCombo(event: Event) {
    this.loading = true
    this.fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.city = 0;
    this.citiesToCombo = selectListByFed(this.fed);
    this.allfilters();
  }

  selectedCity(event: Event) {
    this.loading = true
    this.city = parseInt((event.target as HTMLSelectElement)?.value);
    this.allfilters();
  }

  allfilters() {
    this.providerService.getAllFilters(this.idcategory, this.idsubcategory, this.fed, this.city, this.page).subscribe(p => {
      this.sellers = p.content;
      this.loading = false;
    }, error => { this.loading = false });
  }

  filter() {

    if (this.idsubcategory > 0) {

      if (this.idsubcategory > 0 && this.fed > 0 && this.city == 0) {

        this.providerService.getFilterSub(this.idsubcategory, this.fed, this.city).subscribe(p => {
          this.sellers = p;
          this.loading = false;
        }, error => { this.loading = false });

      } else if (this.idsubcategory > 0 && this.city > 0) {

        this.providerService.getFilterSub(this.idsubcategory, 0, this.city).subscribe(p => {
          this.sellers = p;
          this.loading = false;
        }, error => { this.loading = false });

      } else if (this.idsubcategory > 0 && this.fed == 0 && this.city == 0) {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl('providerSubcategoryList/' + this.idcategory + '/' + this.idsubcategory);
        }, error => { this.loading = false });

      }


    } else {

      if (this.idcategory > 0 && this.fed > 0 && this.city == 0) {

        this.providerService.getFilterCat(this.idcategory, this.fed, this.city).subscribe(p => {
          this.sellers = p;
          this.loading = false;
        }, error => { this.loading = false });

      } else if (this.idcategory > 0 && this.city > 0) {

        this.providerService.getFilterCat(this.idcategory, 0, this.city).subscribe(p => {
          this.sellers = p;
          this.loading = false;
        }, error => { this.loading = false });

      } else if (this.fed == 0 && this.city == 0) {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl('providerSubcategoryList/' + this.idcategory + '/0');
        }, error => { this.loading = false });

        // if(this.idcategory==0){

        // }else{
        //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigateByUrl('providerSubcategoryList/' + this.idcategory + '/0');
        //   }, error => { this.loading = false });
        // }


      }

    }

  }

  newpage() {
    this.loadingnewpage = true;
    this.page += 1;
    this.providerService.getAllPageable(this.page).subscribe(data => {
      this.sellers.push(...data.content);
      this.loadingnewpage = false;
    }, error => { this.loadingnewpage = false; });

  }

  subcategory: string[] = [
    "Filteri",
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
    "Ventilatori",
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
    "Satovi",
    "Krojači",
    "Sahadžije"
  ];

}
