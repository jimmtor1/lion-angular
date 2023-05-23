import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';
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
  subcategoryName: String = "All";

  urlprod_img = `${IMG_PRODUCT_URL}`;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.route.params.subscribe(params => {
      this.category = this.categoryName[params['id'] - 1];
      this.subcategoryName = this.subcategory[params['idc']];
      this.productService.getAllByCategory(params['id'], params['idc']).subscribe(data => {
        this.products = data;
      });
    })
  }

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
