import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './services/shared-data.service';
import { PromotionsService } from './services/promotions.service';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  coinsQuantity:number = 0;
  iduser = localStorage.getItem('iduser');  

  constructor(private coinsService: PromotionsService){

  }

  ngOnInit(): void { 
    if(this.iduser){
      this.coinsService.getCoins(parseInt(this.iduser)).subscribe((coins:number)=>{
        this.coinsQuantity = coins;
      })

      

    }    
   
  }

}
