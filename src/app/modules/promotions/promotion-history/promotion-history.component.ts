import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../services/promotions.service';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-promotion-history',
  templateUrl: './promotion-history.component.html',
  styleUrls: ['./promotion-history.component.css']
})
export class PromotionHistoryComponent implements OnInit {

  iduser = localStorage.getItem('iduser');
  coins:Coin[] = [];
  page:number = 0;

  constructor(private coinsService: PromotionsService) {
  }

  ngOnInit(): void {
    if (this.iduser) {
      this.coinsService.getListCoinsByUser(parseInt(this.iduser), this.page).subscribe((coins: Coin[]) => {
        this.coins = coins;
      })
    }

  }

}
