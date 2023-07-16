import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionsService } from 'src/app/modules/promotions/services/promotions.service';
import { SharedDataService } from 'src/app/modules/promotions/services/shared-data.service';

@Component({
  selector: 'app-buy-coin',
  templateUrl: './buy-coin.component.html',
  styleUrls: ['./buy-coin.component.css']
})
export class BuyCoinComponent implements OnInit {

  selected_check:number=0;
  coins_quantity:number[] = [120,250,650,1350,2100,2900];
  iduser="";
  
  constructor(private promotionService:PromotionsService, private coinsService:SharedDataService, private route:Router){
  }

  ngOnInit(): void {
    this.iduser = localStorage.getItem('iduser')!
  }

  check_one(check:number){   
    this.selected_check=check;
  }

  addCoins(){

    const confirm = window.confirm("Are you sure to buy the selected package?");

    if(confirm && this.selected_check>0){

      const form = new FormData();

      form.append('iduser', this.iduser);
      form.append('quantity', this.coins_quantity[this.selected_check-1].toString());
    
      this.promotionService.buy_coins(form).subscribe(b=>{
        this.coinsService.setCoins(this.coins_quantity[this.selected_check-1]);
        this.route.navigate(['promotions'])
      })      

    }

  }

}
