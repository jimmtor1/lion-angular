import { Component, Input, OnInit } from '@angular/core';
import { Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-socialnetwork',
  templateUrl: './seller-socialnetwork.component.html',
  styleUrls: ['./seller-socialnetwork.component.css']
})
export class SellerSocialnetworkComponent implements OnInit {
  
  seller:Seller=new Seller();

  constructor(private sellerService:SellerService){}
  
  ngOnInit(): void {
    const iduser = localStorage.getItem("iduser");
    if(iduser){
      this.sellerService.getById(JSON.parse(iduser)).subscribe(d=>{
        this.seller = d;
      });
    }
    
  }

  
  

  


}
