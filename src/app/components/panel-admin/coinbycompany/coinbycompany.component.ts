import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'src/app/models/coin';
import { Seller } from 'src/app/models/seller';
import { PromotionsService } from 'src/app/modules/promotions/services/promotions.service';
import { SellerService } from 'src/app/services/seller.service';
declare var $: any;

@Component({
  selector: 'app-coinbycompany',
  templateUrl: './coinbycompany.component.html',
  styleUrls: ['./coinbycompany.component.css']
})
export class CoinbycompanyComponent implements OnInit {

  coins: Coin[];
  page = 0;
  seller: Seller = new Seller();
  quatity:number=0;
  iduser:number;
  

  constructor(private coinService: PromotionsService, private providerService: SellerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(param => {
      if (param['iduser']) {
        this.iduser = parseInt(param['iduser']);
        this.providerService.getById(this.iduser).subscribe((s: Seller) => {
          this.seller = s;
          this.chargeData();
        });
      }
    });
  }

  save() {

    //const confirm = window.confirm("Are you sure?");

    //if (confirm) {
      console.log(this.seller.user.id);
      const form = new FormData();

      form.append('iduser', this.iduser.toString());
      form.append('quantity', this.quatity.toString());

      this.coinService.buy_coins(form).subscribe(b => {        
        this.chargeData();
        $('#Modal').modal('hide');
      })

    //}

  }

  chargeData(){
    this.coinService.getListCoinsByUser(this.iduser, this.page).subscribe(c => {
      this.coins = c;
    });
  }

}
