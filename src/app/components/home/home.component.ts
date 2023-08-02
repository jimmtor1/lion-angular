import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { IMG_PROFILE_URL, select_city } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  products: Product[] = [];
  sellers: Seller[];
  urlprof_img = `${IMG_PROFILE_URL}`;

  constructor(private productService:ProductService, private providerService: SellerService){
    this.productService.getAllByCategory(5,0).subscribe(data => {
      this.products = data;     
    });

    this.providerService.getAllRandomWhitLimit(8).subscribe(data => {
      this.sellers = data;
      //this.organizar();
    });

  }

  get_city(id: number): string {

    if (id) {
      return select_city(id).name;
    } else {
      return "No city";
    }

  }

}
