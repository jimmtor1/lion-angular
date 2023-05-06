import { Component, OnInit, Provider } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Seller } from 'src/app/models/seller';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'productos-inicio',
  templateUrl: './productos-inicio.component.html',
  styleUrls: ['./productos-inicio.component.css']
})
export class ProductosInicioComponent implements OnInit {

  categories:Category[] = [];
  seller:Seller[]=[];

    constructor(private categoryService:CategoryService, private providerService:SellerService){
   
  }

  private getProductsFromCategory(){
    
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;  
    });

    this.providerService.getAllByCategory().subscribe(data => {
      this.seller = data;           
    });


  }

  ngOnInit():void{
    this.getProductsFromCategory();
      
    
    // this.products = [{

    //   "id":1,
    //   "idSubcategory":1,
    //   "productName":"Producto1",
    //   "description":"description1",
    //   "company":"compania1",
    //   "price":200,
    //   "active":true,
    //   "creationDate":"08/04/2023"

    // },
    // {
    //   "id":2,
    //   "idSubcategory":1,
    //   "productName":"Producto2",
    //   "description":"description2",
    //   "company":"compania2",
    //   "price":100,
    //   "active":true,
    //   "creationDate":"07/04/2023"
    // },
    // {
    //   "id":3,
    //   "idSubcategory":2,
    //   "productName":"Televiosor",
    //   "description":"Televisor",
    //   "company":"compania1",
    //   "price":300,
    //   "active":true,
    //   "creationDate":"07/04/2023"
    // }];
  }

}
