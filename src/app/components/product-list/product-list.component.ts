import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products: Product[] = [];
  category: string = "";
  categoryName: string[] = ["Građevinarstvos", "Sve za kuću", "Informatika i telekomunikacije", "Od glave do pete", "Trgovina"];
  subcategoryName:String = "All";

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.route.params.subscribe(params => {
      this.category = this.categoryName[params['id']-1];
      this.subcategoryName = this.subcategory[params['idc']];
      this.productService.getAllByCategory(params['id'], params['idc']).subscribe(data => {
        this.products = data;
      });
    })
  }

  subcategory: string[] = [
    "vidjeti sve",
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
    "Zemljani radovi",
    "Betonski radovi",
    "Armirano-betonski radovi",
    "Zidarski radovi",
    "Tesarski radovi",
    "Izolacijski radovi",
    "Servis TV, audio i video uređaja",

    "Servis mobitela",
    "Servis kućanskih aparata",
    "Servis klima uređaja",
    "Servis računara",
    "Servis igraćih konzola",
    "Web hosting",
    "Web i software izrada",
    "Mreže, serveri i telekomunikacije",
    "Mrežna sigurnost",

    "Odjeća",
    "Obuća",
    "Radna odjeća i zaštitna oprema",
    "Dječija odjeća i obuća",
    "Dorbe i novčanici",
    "Naočale",
    "Nakit",
    "Satovi",
    "Krojači",
    "Web i software izrada",
    "Sahadžij",

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
    "Tepisi"];




  // subcategory:String[][] = [
  //   ["Građevinski radovi","Obrtnički radovi","Instalaterski radovi","Stolarija"],
  //   ["Građevinski radovi","Obrtnički radovi","Instalaterski radovi","Stolarija","Građevinski radovi"],
  //   ["Servisiranje uređaja i opreme","Informatičke usluge"],
  //   ["Obuci se","Zanatski radovi"],
  // ]


}
