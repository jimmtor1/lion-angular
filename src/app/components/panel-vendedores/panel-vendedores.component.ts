import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'panel-vendedores',
  templateUrl: './panel-vendedores.component.html',
  styleUrls: ['./panel-vendedores.component.css']
})
export class PanelVendedoresComponent implements OnInit {

  products: Product[] = [];
  // idseller: number;

  constructor(private productService: ProductService, private router: Router, private auth:AuthService) { }

  ngOnInit(): void {
    // if(this.auth.idprovider==0){      
    //   this.router.navigate(['login']);
    // }else{
    //   this.getProductList();
    // }
    this.getProductList();
  }


  getProductList(): void {        
    // this.auth.idprovider
    this.productService.getAllByProvider(1).subscribe(data => {
      this.products = data;
    });
    // this.route.params.subscribe(params => {
    //   this.idseller = params['id'];      
    //   this.productService.getAllByCategory(params['id'], params['idc']).subscribe(data => {
    //     this.products = data;
    //   });
    // })
  }

}
