import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSimple } from 'src/app/models/product-simple';
import { Product2 } from 'src/app/models/product2';
import { FEDERATIONS, federation, selectListByFed } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})


export class ProductCategoryListComponent implements OnInit {

  //products: Product2[] = [];
  //category: string = "";
  //categoryName: string[] = ["Građevinarstvo", "Sve za kuću", "Informatika i telekomunikacije", "Od glave do pete", "Svi proizvodi / Usluge"];
  //subcategoryName: String = "Filteri";
  //federations: federation[] = FEDERATIONS;
  // citiesToCombo: any[] = [];
  // fed: number = 0;
  // city: number = 0;
  // idsubcategory: number;
  // idcategory: number;


  // defaultcategory: number;

  //btnActive = false;
  // urlprod_img = `${IMG_PRODUCT_URL}`;


  //  ______________________

  categoryName: string;
  subcategoryName: string = "Filteri";
  loading = true;
  price1: number | undefined;
  price2: number | undefined;
  idcategory: number;
  pagePromoted = -1;
  pageUnpromoted = -1;
  page = 0;
  products: ProductSimple[] = [];
  federations: federation[] = FEDERATIONS;
  citiesToCombo: any[] = [];
  fed: number = 0;
  city: number = 0;

  //________________________
  all = false;
  triggerChild: boolean = false;
  allowScroll = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.getProductList();
  }

  triggerChildProcedure() {
    this.triggerChild = true; // Cambia el valor para activar el procedimiento en el componente hijo         
  }

  onChildProcedureFinished() {
    this.triggerChild = false; // Habilita el botón nuevamente
    this.allowScroll = true;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {

    if (this.allowScroll) {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      // console.log("esta bien abajo el scroll?")
      // console.log(windowBottom >= docHeight * 0.99);
      if (windowBottom >= docHeight * 0.98) {
        // console.log("dentro del if del scroll")
        this.allowScroll = false;
        this.triggerChild = true;
      }
    }
  }

  getProductList(): void {

    this.route.params.subscribe(params => {

      this.idcategory = params['idcategory']

      this.categoryName = params['category'];
      this.subcategoryName = params['subcategory'];

      if (params['idcategory'] != 5) {
        this.productService.getProducs2bycagetory(this.idcategory).subscribe(data => {
          this.products = data;
          this.loading = false;
          this.all = false;
          this.triggerChild = false;
        });
      } else {
        this.all = true;
        this.loading = false;
        // console.log("desde el normal")       
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

  //getProductListByDefaultCategory() {
  // this.productService.getAllByDefaultCategory(this.defaultcategory).subscribe(p => {      
  //   this.products = p;
  //   this.loading = false;
  // });
  //}

  getProductListByPrice() {
    // console.log("getProductListByPrice")     
    this.loading = true;
    this.allfilters();
  }

  // doChage() {    
  // if (this.price2 !== undefined && this.price2 > 0) {
  //   this.btnActive = true;
  // } else {
  //   this.btnActive = false;
  // }
  //}

  // subcategory: string[] = [
  //   "Filteri",
  //   "Mobiteli",
  //   "Automobili",
  //   "Sportska oprema",
  //   "Informatička oprema",
  //   "Audio, video i foto",
  //   "Dječiji svijet",
  //   "Odjeća",
  //   "Obuća",
  //   "Građevinski materijal",
  //   "Računari i laptopi",
  //   "Konzole",
  //   "Tableti",
  //   "Mašine i alati",
  //   "Klima uređaji",
  //   "Radijatori",
  //   "Ventilatori",
  //   "Kamini",
  //   "Peći",
  //   "Grijalice",
  //   "Jastuci",
  //   "Posteljina",
  //   "Prekrivači i deke",
  //   "Zavjese",
  //   "Tepisi",
  //   "Kuhinje",
  //   "Stolovi i stolice",
  //   "Dnevni boravak namještaj",
  //   "Stilski namještaj",
  //   "Dječije sobe",
  //   "Kupaonski namještaj",
  //   "Predsoblja namještaj",
  //   "Led rasvjeta",
  //   "Lusteri",
  //   "Stropna rasvjeta i plafonjere",
  //   "Zidna rasvjeta",
  //   "Podne lampe",
  //   "Stolne lampe",
  //   "Ugradbena rasvjeta",
  //   "Vanjska rasvjeta",
  //   "Vaze",
  //   "Zidni sat",
  //   "Tapete",
  //   "Ostale dekoracije",
  //   "Jastuci",
  //   "Posteljina",
  //   "Prekrivači i deke",
  //   "Zavjese",
  //   "Tepisi"
  // ];

  allfilters() {
    // if(this.idcategory==undefined){
    //   this.idcategory=0;
    // }
    // if(this.idsubcategory==undefined){
    //   this.idsubcategory=0;
    // }
    // if(this.defaultcategory==undefined){
    //   this.defaultcategory=0;
    // }

    this.productService.getProducts2AllFilters(this.idcategory == 5 ? 0 : this.idcategory, this.fed, this.city, this.price1, this.price2, this.page).subscribe(p => {
      console.log(p.content);
      this.products = p.content;
      this.loading = false;
    }, error => { this.loading = false });

  }

  //filter() {


  // if (this.fed > 0 && this.city == 0 && this.price2 == null) {

  //   this.productService.getFilterFederationCity(this.idcategory, this.idsubcategory, this.fed, this.city).subscribe(p => {
  //     this.products = p;
  //     this.loading = false;
  //   }, error => { this.loading = false });

  // } else if (this.city > 0 && this.price2 == null) {

  //   this.productService.getFilterFederationCity(this.idcategory, this.idsubcategory, 0, this.city).subscribe(p => {
  //     this.products = p;
  //     this.loading = false;
  //   }, error => { this.loading = false });

  // } else if (this.fed == 0 && this.city == 0 && (this.price2 !== undefined && this.price2 > 0)) {

  //   this.productService.getFilterPrice(this.idcategory, this.idsubcategory, this.fed, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
  //     this.products = p;
  //     this.loading = false;
  //   }, error => { this.loading = false });

  // } else if (this.fed > 0 && this.city > 0 && (this.price2 !== undefined && this.price2 > 0)) {

  //   this.productService.getFilterPrice(this.idcategory, this.idsubcategory, 0, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
  //     this.products = p;
  //     this.loading = false;
  //   }, error => { this.loading = false });

  // } else if (this.fed > 0 && this.city == 0 && (this.price2 !== undefined && this.price2 > 0)) {

  //   this.productService.getFilterPrice(this.idcategory, this.idsubcategory, this.fed, this.city, this.price1 == undefined ? 0 : this.price1, this.price2).subscribe(p => {
  //     this.products = p;
  //     this.loading = false;
  //   }, error => { this.loading = false });

  // } else {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigateByUrl('productCategoryList/5/' + this.idsubcategory);
  //   }, error => { this.loading = false });
  // }




  //}



}
