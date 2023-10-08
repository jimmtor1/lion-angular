import { Component, Input, OnInit } from '@angular/core';
import { Truck, Truck2 } from 'src/app/models/truck';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.css']
})
export class TruckDetailComponent implements OnInit {

  @Input() idtruck:number; 

  truck:Truck2 = new Truck2();

  loading=true;
  
  constructor(private productService:ProductService){

  }


  ngOnInit(): void {
    this.productService.getOneTruck2(this.idtruck).subscribe(t=>{
      this.truck=t;
      this.loading=false;
      
    });       
  }




}
