import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css']
})
export class PromoteComponent implements OnInit {

  imageurl = `${IMG_PRODUCT_URL}`
  product: Product = new Product();
  active = 0;
  iduser:string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      if (param['idproduct']) {
        this.productService.getById(param['idproduct']).subscribe(p => {
          this.product = p;
          console.log("p " + JSON.stringify(p));
        });
      }
    });


  }

  addPromotion() {
    const form = new FormData();

    form.append('idproduct', this.product.idproduct.toString());
    form.append('choice', this.active.toString());
    form.append('iduser', this.getIduser());

    this.productService.promote(form).subscribe(b => {
      if (b) {
        this.router.navigate(['/addetails/'+this.product.idproduct])
      }
    });
  }

  selection(id: number) {
    this.active = id;
  }

  getIduser():string{
    if(!this.iduser){
      this.iduser = localStorage.getItem('iduser')!;
    }
    return this.iduser;
  }

}
