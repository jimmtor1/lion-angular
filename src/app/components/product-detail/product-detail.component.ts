import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { IMG_PRODUCT_URL, select_city } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { FunctionsService } from 'src/app/util/functions.service';

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
  city: string;
  loading = true;
  promoted = false;
  iduser:number;
  idrole:number;

  @ViewChild('scrollable') messageContainer: ElementRef;

  urlprod_img = `${IMG_PRODUCT_URL}`;
  

  constructor(private productService: ProductService, private route: ActivatedRoute, private sellerService: SellerService, private modelChat: ModalService) {}

  ngOnInit(): void {

    this.principalImage = "";
    this.route.params.subscribe(param => {
     
      if (param['id'] != null) {
        this.loading = true;
        this.productService.getById(param['id']).subscribe(result => {
          this.product = result;
          this.principalImage = this.urlprod_img + this.product.productImageList[0].idimage + this.product.productImageList[0].extension;
          this.isPromoted();

          this.sellerService.getById(this.product.idprovider).subscribe(pro => {
            this.seller = pro;
            this.city = select_city(this.seller.user.city).name;
            this.loading = false;
          });

          this.productService.getAllByProvider(this.product.idprovider).subscribe(result => {
            //result.forEach(r => {
              this.producByProvider = result;            
            //})
          });

        })

      }
    });

    let user = localStorage.getItem('iduser')
    if(user){
      this.iduser = parseInt(user);
    }

    let role = localStorage.getItem('role')
    if(role){
      this.idrole = parseInt(role);
    }
    

  }

  chagePrincipalImage(position: number) {
    this.principalImage = this.urlprod_img + this.product.productImageList[position].idimage + this.product.productImageList[position].extension;
  }

  emitSeller(idseller: number) {
    this.modelChat.openChat(idseller);
  }

  isPromoted(){    
    this.promoted = FunctionsService.isGreaterDate(this.product.promotedTo,new Date());    
  }

  del(){
    if(this.idrole=3){

      const confirm = window.confirm("Are you sure?");

      if(confirm){
        this.productService.removePromotion(this.product.idproduct).subscribe(p=>{
          this.product = p;
          this.isPromoted();
        });
      }
      
    }
  }

}


