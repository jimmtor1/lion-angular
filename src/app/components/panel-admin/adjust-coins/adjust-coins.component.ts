// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Seller } from 'src/app/models/seller';
// import { PromotionsService } from 'src/app/modules/promotions/services/promotions.service';
// import { SellerService } from 'src/app/services/seller.service';

// @Component({
//   selector: 'app-adjust-coins',
//   templateUrl: './adjust-coins.component.html',
//   styleUrls: ['./adjust-coins.component.css']
// })
// export class AdjustCoinsComponent {

  
//   seller: Seller = new Seller();

//   constructor(private providerService: SellerService, private route: ActivatedRoute, private coinService:PromotionsService) {}

//   ngOnInit(): void {

//     this.route.params.subscribe(param => {
//       if (param['iduser']) {

//         const form = new FormData();


//         this.coinService.buy_coins(param['iduser']).subscribe(c => {          
//           this.coins = c;
//           this.providerService.getById(parseInt(param['iduser'])).subscribe((s: Seller) => {
//             this.seller = s;
//           });
//         });
//       }
//     });


//   }

//   addCoins(){

//     const confirm = window.confirm("¿Are you sure?");

//     if(confirm){

//       const form = new FormData();

//       form.append('iduser', this.iduser);
//       form.append('quantity', this.coins_quantity[this.selected_check-1].toString());
    
//       this.promotionService.buy_coins(form).subscribe(b=>{
//         this.coinsService.setCoins(this.coins_quantity[this.selected_check-1]);
//         this.route.navigate(['promotions'])
//       })      

//     }

//   }

// }
