import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerSimple } from 'src/app/models/seller-simple';
import { FEDERATIONS, IMG_PROFILE_URL, federation, selectListByFed } from 'src/app/services/helper';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-category-list',
  templateUrl: './seller-category-list.component.html',
  styleUrls: ['./seller-category-list.component.css']
})
export class SellerCategoryListComponent implements OnInit {

  sellers: SellerSimple[] = [];
  categoryName: string[] = ["Građevinarstvo", "Sve za kuću", "Informatika i telekomunikacije", "Od glave do pete"];
  subcategoryName: String = "All";
  loading = true;
  loadingnewpage = false;
  federations: federation[] = FEDERATIONS;
  citiesToCombo: any[] = [];

  fed: number = 0;
  city: number = 0;
  idsubcategory: number;
  idcategory: number;
  page = 0;
  urlprof_img = `${IMG_PROFILE_URL}`;

  keyword:string="0";


  // ____________________________________________
  category: string
  subcategory: string;
  //____________________________________________

  constructor(private providerService: SellerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   
    this.getProvidersFromSubcategory();
  }

  private getProvidersFromSubcategory(): void {
    this.route.params.subscribe(params => {
      this.loading = true;

      this.category = params['category'];
      this.subcategory = params['subcategory'];

      this.idcategory = parseInt(params['idcategory']);

      if(params['keyword']){        
        this.keyword = params['keyword'];        
      }
     
    
      if (this.idcategory != 0) {
        this.providerService.getAllByCategoryId(this.idcategory).subscribe(data => {
          this.sellers = data;
          this.loading = false;
        }, error => { this.loading = false; });
      }else if(this.keyword){
        this.allfilters();
      }
       else {
        this.providerService.getAllAcceptedSimple().subscribe(data => {
          this.sellers = data;
          this.loading = false;
        }, error => { this.loading = false;});
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
    this.providerService.getAllFilters(this.idcategory, this.fed, this.city, this.keyword, this.page).subscribe(p => {
      this.sellers = p.content;
      this.loading = false;
    }, error => { this.loading = false });
  }

  

  newpage() {
    this.loadingnewpage = true;
    this.page += 1;
    this.providerService.getAllPageable(this.page).subscribe(data => {
      this.sellers.push(...data.content);
      this.loadingnewpage = false;
    }, error => { this.loadingnewpage = false; });

  }
  

}
