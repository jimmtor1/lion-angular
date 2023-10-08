import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductImage } from 'src/app/models/product-image';
import { ProductSimple } from 'src/app/models/product-simple';
import { Product2 } from 'src/app/models/product2';
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

  @ViewChild('slider') sliderElement!: ElementRef;

  product: Product2;
  producByProvider: ProductSimple[] = [];
  seller: Seller;
  city: string;
  loading = false;
  promoted = false;
  iduser: number;
  idrole: number;
  productImageList: ProductImage[];

  urlprod_img = `${IMG_PRODUCT_URL}`;
  slideWidth: number = 0;
  currentIndex: number = 0;

  isTruck=false;

  constructor(private viewportScroller: ViewportScroller,private productService: ProductService, private route: ActivatedRoute, private sellerService: SellerService, private modelChat: ModalService, private renderer: Renderer2) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(param => {

      if (param['id'] != null) {
        this.loading = true;       
        this.productService.getProduc2byId(param['id']).subscribe(result => {
          this.product = result;          
          this.isPromoted();

          this._isTruck(this.product.categoryList);
         
          this.sellerService.getById(this.product.iduser!).subscribe(pro => {
            this.seller = pro;
            this.city = select_city(this.seller.user.city).name;
            this.loading = false;           
            this.viewportScroller.scrollToPosition([0, 0]);           
            setTimeout(() => {
              this.slideWidth = this.sliderElement.nativeElement.querySelector('.slide').clientWidth;
            }, 500);

          });
          this.productService.getProducs2byuser(this.product.iduser!).subscribe(result => {
            this.producByProvider = result;
          });

        });

        this.productService.getImagesById(param['id']).subscribe(rs => {
          this.productImageList = rs;
        });

      }
    });

    let user = localStorage.getItem('iduser')
    if (user) {
      this.iduser = parseInt(user);
    }

    let role = localStorage.getItem('role')
    if (role) {
      this.idrole = parseInt(role);
    }

  }

  emitSeller(idseller: number, idproduct:number) {
    this.modelChat.openChatAndSend(idseller, idproduct);
  }

  isPromoted() {
    this.promoted = FunctionsService.isGreaterDate(this.product.promotedTo!, new Date());
  }

  del() {
    // if(this.idrole=3){

    //   const confirm = window.confirm("Are you sure?");

    //   if(confirm){
    //     this.productService.removePromotion(this.product.idproduct).subscribe(p=>{
    //       this.product = p;
    //       this.isPromoted();
    //     });
    //   }

    // }
  }

  // ______________________slide funcionality_________________________




  prevSlide() {
    this.moveToIndex(this.currentIndex - 1);
  }

  nextSlide() {
    this.moveToIndex(this.currentIndex + 1);
  }

  moveToIndex(index: number) {

    if (index < 0) {
      index = this.productImageList.length - 1;
    } else if (index >= this.productImageList.length) {
      index = 0;
    }
    this.currentIndex = index;
    const transformValue = `translateX(-${this.currentIndex * this.slideWidth}px)`;
    this.renderer.setStyle(this.sliderElement.nativeElement, 'transform', transformValue);
  }

  
  _isTruck(categories:any[]){
    
    for (let i = 0; i < categories.length; i++) {
     
      if (categories[i].idcategory == 222) {       
        this.isTruck = true;
        break; // Si encontramos el 5, salir del bucle
      }
    }
  }


}


