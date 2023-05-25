import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from 'src/app/services/buyer.service';
import { select_fed, select_city } from 'src/app/services/helper';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  buyer:Buyer;
  fed:string = "Nije odabrano";
  city:string = "Nije odabrano";

  constructor(private buyerService:BuyerService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.getById(param['id']);
    })
   
  }

  getById(id:number){
    this.buyerService.getByIdUser(id).subscribe(b =>{      
      this.buyer = b;

      if(this.buyer.user.federation){
        let x = select_fed(this.buyer.user.federation);
        if(x){
          this.fed = x.name;
        }        
      }
      
      if(this.buyer.user.city){
        this.city = select_city(this.buyer.user.city).name;
      }

    });
  }

}
