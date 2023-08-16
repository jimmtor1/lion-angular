import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  product: Product2;
  //principalImage: string;
  producByProvider: ProductSimple[] = [];
  seller: Seller;
  city: string;
  loading = true;
  promoted = false;
  iduser: number;
  idrole: number;
  productImageList: ProductImage[];

  @ViewChild('scrollable') messageContainer: ElementRef;

  urlprod_img = `${IMG_PRODUCT_URL}`;


  constructor(private productService: ProductService, private route: ActivatedRoute, private sellerService: SellerService, private modelChat: ModalService) { }

  ngOnInit(): void {

    //this.principalImage = "";
    this.route.params.subscribe(param => {

      if (param['id'] != null) {

        this.loading = true;
        // this.productService.getById(param['id']).subscribe(result => {
        this.productService.getProduc2byId(param['id']).subscribe(result => {
          this.product = result;

          //this.principalImage = this.urlprod_img + this.product.productImageList[0].idimage + this.product.productImageList[0].extension;
          this.isPromoted();

          this.sellerService.getById(this.product.iduser!).subscribe(pro => {

            this.seller = pro;
            this.city = select_city(this.seller.user.city).name;
            this.loading = false;
          });
          // this.productService.getAllByProvider(this.product.idprovider).subscribe(result => {
          this.productService.getProducs2byuser(this.product.iduser!).subscribe(result => {
            //result.forEach(r => {
            this.producByProvider = result;
            //})
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


  //section mouse moved_______________________________________
  private isDragging = false;
  private startX = 0;
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startX;

      if (deltaX > 10) {
        console.log("derecha")
        // Usuario empujó hacia la derecha
        // Ejecutar función para cambiar la imagen hacia la derecha
      } else if (deltaX < -10) {
        console.log("izquierda")
        // Usuario empujó hacia la izquierda
        // Ejecutar función para cambiar la imagen hacia la izquierda
      }
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

//____________________________________________________

  chagePrincipalImage(position: number) {
    this.product.mainImage = this.productImageList[position].extension;
  }

  emitSeller(idseller: number) {
    this.modelChat.openChat(idseller);
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

}


