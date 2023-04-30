import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.css']
})
export class BuyerListComponent implements OnInit {

  @Output() BuyerEditEvent = new EventEmitter<number>();

  buyers:Buyer[];

  constructor(private buyerService:BuyerService){}
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.buyerService.getAll().subscribe(list =>{      
      this.buyers = list;
    });
  }

  emitBuyerEdit(idbuyer:number){
    this.BuyerEditEvent.emit(idbuyer);
  }

 

}
