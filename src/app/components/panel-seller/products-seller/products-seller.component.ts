import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-seller',
  templateUrl: './products-seller.component.html',
  styleUrls: ['./products-seller.component.css']
})
export class ProductsSellerComponent {

  products: Product[] = [];
  iduser: number;
  urlprod_img = `${IMG_PRODUCT_URL}`;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      this.iduser = JSON.parse(usuarioString);
    }
    this.getProductList();
  }

  getProductList(): void {
    this.productService.getAllByProvider(this.iduser).subscribe(data => {
      this.products = data;
    });

  }

}
