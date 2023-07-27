import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ad-management',
  templateUrl: './ad-management.component.html',
  styleUrls: ['./ad-management.component.css']
})
export class AdManagementComponent implements OnInit {
  
  imageurl = `${IMG_PRODUCT_URL}`
  products:Product[] = [];

  constructor(private producService: ProductService){}

  ngOnInit(): void {
    this.producService.getAll().subscribe(p => {
      this.products = p;
    });
  }

}
