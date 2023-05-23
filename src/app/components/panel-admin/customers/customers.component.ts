import { Component } from '@angular/core';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  buyers: Buyer[];

  constructor(private buyerService: BuyerService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.buyerService.getAll().subscribe(list => {
      this.buyers = list;
    });
  }

}
