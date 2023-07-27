import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { CategoryWithSellers, SellerByCategory } from 'src/app/models/seller-by-category';
import { CategoryService } from 'src/app/services/category.service';
import { IMG_PRODUCT_URL, IMG_PROFILE_URL, select_city } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'productos-inicio',
  templateUrl: './productos-inicio.component.html',
  styleUrls: ['./productos-inicio.component.css']
})
export class ProductosInicioComponent implements OnInit {

  //categories: Category[] = [];
  sellerByCategory: SellerByCategory[] = [];
  //categoryWithSellers: CategoryWithSellers[] = [];
  products: Product[] = [];
  image: string;
  sellers: Seller[];

  urlprod_img = `${IMG_PRODUCT_URL}`;
  urlprof_img = `${IMG_PROFILE_URL}`;

  constructor(private categoryService: CategoryService, private providerService: SellerService, private productService: ProductService) { }

  private getProductsFromCategory() {

    // this.categoryService.getAll().subscribe(data => {
    //   this.categories = data;
    //   this.products = this.categories[4].products;
    // }, error => {
    //   // if (localStorage.getItem('iduser')) {
    //   //   localStorage.clear();
    //   //   location.reload()
    //   // }
    // });

    this.productService.getAllByCategory(5,0).subscribe(data => {
      this.products = data;
    });

    this.providerService.getAllRandomWhitLimit(8).subscribe(data => {
      this.sellers = data;
      //this.organizar();
    });

  }


  // organizar() {

  //   let seller1: Seller[] = [];
  //   let seller2: Seller[] = [];
  //   let seller3: Seller[] = [];
  //   let seller4: Seller[] = [];

  //   this.sellerByCategory.forEach(c => {

  //     switch (c.category) {
  //       case 1: seller1.push(c.provider);
  //         break;

  //       case 2: seller2.push(c.provider);
  //         break;

  //       case 3: seller3.push(c.provider);
  //         break;

  //       case 4: seller4.push(c.provider);
  //         break;

  //     }

  //   })

  //   this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[0], seller1));
  //   this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[1], seller2));
  //   this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[2], seller3));
  //   this.categoryWithSellers.push(new CategoryWithSellers(this.categoryNames[3], seller4));

  // }

  ngOnInit(): void {
    this.getProductsFromCategory();
  }

  get_city(id: number): string {

    if (id) {
      return select_city(id).name;
    } else {
      return "No city";
    }

  }

  // categoryNames: string[] = [
  //   "Građevinarstvo",
  //   "Sve za kuću",
  //   "Informatika i telekomunikacije",
  //   "Od glave do pete",
  //   "Svi proizvodi / Usluge",
  // ]



}
