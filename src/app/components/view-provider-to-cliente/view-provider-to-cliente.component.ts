import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { IMG_PRODUCT_URL, IMG_PROFILE_URL, select_city, select_fed } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'view-provider-to-cliente',
  templateUrl: './view-provider-to-cliente.component.html',
  styleUrls: ['./view-provider-to-cliente.component.css']
})

export class ViewProviderToClienteComponent implements OnInit {

  seller: Seller=new Seller();
  producByProvider: Product[] = [];
  loading:boolean = true;

  url_prof_img = `${IMG_PROFILE_URL}`;
  url_prod_img = `${IMG_PRODUCT_URL}`;

  fed:string = "Nije odabrano";
  city:string = "Nije odabrano";

  constructor(private route: ActivatedRoute, private sellerService: SellerService, private productService: ProductService) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      if (param['id'] != null) {

        this.sellerService.getById(param['id']).subscribe(pro => {          
          this.seller = pro; 

          if(this.seller.user.federation){
            this.fed = select_fed(this.seller.user.federation).name;
          }
          
          if(this.seller.user.city){
            this.city = select_city(this.seller.user.city).name;
          }

         
          this.loading = false;         
        });

        this.productService.getAllByProvider(param['id']).subscribe(result => {
          result.forEach(r => {
            this.producByProvider.push(r);
          })
        });
        
      }

    });
   

  }


}
