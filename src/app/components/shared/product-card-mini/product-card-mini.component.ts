import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';

@Component({
  selector: 'app-product-card-mini',
  templateUrl: './product-card-mini.component.html',
  styleUrls: ['./product-card-mini.component.css']
})
export class ProductCardMiniComponent {

  @Input() product : Product;
  urlprod_img = `${IMG_PRODUCT_URL}`;
  type:string[] = ['NOVO','KORIŠTENO','USLUGA']
  

  // idproduct:number;
  // urlImage:string;
  // productName:string;
  // productPromoteActive:boolean;
  // productPrice:number;

}
