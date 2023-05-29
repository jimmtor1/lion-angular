import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { IMG_PRODUCT_URL, select_city } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  principalImage: string;
  producByProvider: Product[] = [];
  seller: Seller;
  city:string;
  loading = true;

  urlprod_img = `${IMG_PRODUCT_URL}`;

  constructor(private productService: ProductService, private route: ActivatedRoute, private sellerService: SellerService) {
    // this.product = new Product();
    // this.seller = new Seller();
    // this.producByProvider = [];
  }

  ngOnInit(): void {

    this.principalImage = "";
    this.route.params.subscribe(param => {
      if (param['id'] != null) {
        this.productService.getById(param['id']).subscribe(result => {
          this.product = result;
          this.principalImage = this.urlprod_img + this.product.productImageList[0].idimage + this.product.productImageList[0].extension;


          this.sellerService.getById(this.product.idprovider).subscribe(pro => {
            this.seller = pro;
            this.city = select_city(this.seller.user.city).name; 
            this.loading=false;
          });

          this.productService.getAllByProvider(this.product.idprovider).subscribe(result => {
            result.forEach(r => {
              this.producByProvider.push(r);
              
            })
          });

        })

      }
    });

  }

  chagePrincipalImage(position: number) {
    this.principalImage = this.urlprod_img+ this.product.productImageList[position].idimage + this.product.productImageList[position].extension;
  }


}


