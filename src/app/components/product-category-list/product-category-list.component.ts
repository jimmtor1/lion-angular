import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { FEDERATIONS, IMG_PRODUCT_URL, federation, selectListByFed } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})


export class ProductCategoryListComponent implements OnInit {

  products: Product[] = [];
  category: string = "";
  categoryName: string[] = ["Građevinarstvo", "Sve za kuću", "Informatika i telekomunikacije", "Od glave do pete", "Svi proizvodi / Usluge"];
  subcategoryName: String = "Filteri";
  federations: federation[] = FEDERATIONS;
  citiesToCombo: any[] = [];
  fed: number = 0;
  city: number = 0;
  idsubcategory: number;
  idcategory: number;
  loading = true;
  price1: number | undefined;
  price2: number | undefined;
  page = 0;
  defaultcategory: number;

  btnActive = false;

  urlprod_img = `${IMG_PRODUCT_URL}`;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    
    this.route.params.subscribe(params => {
     
      this.defaultcategory = params['def']

      if (this.defaultcategory) {        
        this.getProductListByDefaultCategory();
      } else {

        this.idcategory = params['id'];
        this.idsubcategory = params['idc'];

        this.category = this.categoryName[params['id'] - 1];
        this.subcategoryName = this.subcategory[params['idc'] - 70];

        this.productService.getAllByCategory(this.idcategory, params['idc']).subscribe(data => {
          this.products = data;
          this.loading = false;
        });

      }

    })
  }

  citiesCombo(event: Event) {
    this.loading = true
    this.price1 = undefined;
    this.price2 = undefined;
    this.city = 0;
    this.fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.citiesToCombo = selectListByFed(this.fed);
    this.allfilters();
  }

  selectedCity(event: Event) {
    this.loading = true;
    this.price1 = undefined;
    this.price2 = undefined;
    this.city = parseInt((event.target as HTMLSelectElement)?.value);
    this.allfilters();
  }

  getProductListByDefaultCategory() {
    this.productService.getAllByDefaultCategory(this.defaultcategory).subscribe(p => {      
      this.products = p;
      this.loading = false;
    });
  }

  getProductListByPrice() { 
    console.log("getProductListByPrice")   
    this.loading = true;
    this.allfilters();
  }

  doChage() {    
    if (this.price2 !== undefined && this.price2 > 0) {
      this.btnActive = true;
    } else {
      this.btnActive = false;
    }
  }

  subcategory: string[] = [
    "Filteri",
    "Mobiteli",
    "Automobili",
    "Sportska oprema",
    "Informatička oprema",
    "Audio, video i foto",
    "Dječiji svijet",
    "Odjeća",
    "Obuća",
    "Građevinski materijal",
    "Računari i laptopi",
    "Konzole",
    "Tableti",
    "Mašine i alati",
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
    "Jastuci",
    "Posteljina",
    "Prekrivači i deke",
    "Zavjese",
    "Tepisi"
  ];

  allfilters() {
    if(this.idcategory==undefined){
      this.idcategory=0;
    }
    if(this.idsubcategory==undefined){
      this.idsubcategory=0;
    }
    if(this.defaultcategory==undefined){
      this.defaultcategory=0;
    }

    this.productService.getAllFilters(this.defaultcategory,this.idcategory, this.idsubcategory, this.fed, this.city, this.price1, this.price2, this.page).subscribe(p => {
      this.products = p.content;
      this.loading = false;
    }, error => { this.loading = false });

  }

  filter() {

    // if (this.idsubcategory > 0) {
   
    if (this.fed > 0 && this.city == 0 && this.price2 == null) {

      this.productService.getFilterFederationCity(this.idcategory, this.idsubcategory, this.fed, this.city).subscribe(p => {
        this.products = p;
        this.loading = false;
      }, error => { this.loading = false });

    } else if (this.city > 0 && this.price2 == null) {

      this.productService.getFilterFederationCity(this.idcategory, this.idsubcategory, 0, this.city).subscribe(p => {
        this.products = p;
        this.loading = false;
      }, error => { this.loading = false });

    } else if (this.fed == 0 && this.city == 0 && (this.price2 !== undefined && this.price2 > 0)) {

      this.productService.getFilterPrice(this.idcategory, this.idsubcategory, this.fed, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
        this.products = p;
        this.loading = false;
      }, error => { this.loading = false });

    } else if (this.fed > 0 && this.city > 0 && (this.price2 !== undefined && this.price2 > 0)) {

      this.productService.getFilterPrice(this.idcategory, this.idsubcategory, 0, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
        this.products = p;
        this.loading = false;
      }, error => { this.loading = false });

    } else if (this.fed > 0 && this.city == 0 && (this.price2 !== undefined && this.price2 > 0)) {

      this.productService.getFilterPrice(this.idcategory, this.idsubcategory, this.fed, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
        this.products = p;
        this.loading = false;
      }, error => { this.loading = false });

    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('productCategoryList/5/' + this.idsubcategory);
      }, error => { this.loading = false });
    }

    // }else{

    // }








  }



}
