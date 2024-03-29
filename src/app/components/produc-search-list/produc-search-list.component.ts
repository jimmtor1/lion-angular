import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSimple } from 'src/app/models/product-simple';
import { FEDERATIONS, IMG_PRODUCT_URL, federation, selectListByFed } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produc-search-list',
  templateUrl: './produc-search-list.component.html',
  styleUrls: ['./produc-search-list.component.css']
})
export class ProducSearchListComponent implements OnInit {
  
  products: ProductSimple[] = [];
  federations: federation[] = FEDERATIONS;
  urlprod_img = `${IMG_PRODUCT_URL}`;
  citiesToCombo: any[] = [];
  loading = true;
  price1: number | undefined;
  price2: number | undefined;
  fed: number = 0;
  city: number = 0;
  btnActive = false;
  word="";
  page = 0;

  constructor(private route:ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {

    this.route.params.subscribe(param=>{
      this.word = param['word'];  
      this.lookfor(param['word']);
    });

  }


  citiesCombo(event: Event) {
    this.loading = true
    this.price1 = undefined;
    this.price2 = undefined;
    this.city = 0;
    this.fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.citiesToCombo = selectListByFed(this.fed);
    this.filterAll();
  }

  selectedCity(event: Event) {
    this.loading = true;
    this.price1 = undefined;
    this.price2 = undefined;
    this.city = parseInt((event.target as HTMLSelectElement)?.value);
    this.filterAll();
  }

  getProductListByPrice() {
    this.loading = true;
    this.filterAll();
  }

  doChage() {
    if (this.price2 !== undefined && this.price2 > 0) {
      this.btnActive = true;
    } else {
      this.btnActive = false;
    }
  }

  lookfor(word:string){ 
    //this.productService.getSearchProduct(word).subscribe(p=>{    
    this.productService.getProducs2bykeyword(word).subscribe(p=>{     
       this.products = p;
       this.loading = false;
    });
  }

  filterAll(){
    this.productService.getAllFilterSearch(this.fed, this.city, this.price1, this.price2, this.word,this.page).subscribe(p=>{     
      this.products = p.content;
      this.loading = false;
   });
  }


}
