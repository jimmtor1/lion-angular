import { Component, OnInit } from '@angular/core';
import { Buyer } from 'src/app/models/buyer';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-panel-buyer',
  templateUrl: './panel-buyer.component.html',
  styleUrls: ['./panel-buyer.component.css']
})
export class PanelBuyerComponent implements OnInit {

  currentPage: string = 'home';
  title: string = "";
  // action: string = "";
  activeOrderList = false;

  orders: Order[];

  buyer:Buyer;
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    //traer el buyer para pasar, por ahora pongo int 1
    this.orderService.getByIdBuyer(1).subscribe(buy=>{
      this.orders = buy;
    });

  }


}
