import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-buyer-list',
  templateUrl: './product-buyer-list.component.html',
  styleUrls: ['./product-buyer-list.component.css']
})
export class ProductBuyerListComponent implements OnInit {
  
  @Output() showProducEditEvent = new EventEmitter<number>();
 
  products: Product[] = [];
  iduser:number;

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

  showEditProductComponente(idproduct:number) {    
    this.showProducEditEvent.emit(idproduct);    
  }

}
