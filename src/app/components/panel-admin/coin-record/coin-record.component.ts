import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';
import { PromotionsService } from 'src/app/modules/promotions/services/promotions.service';

@Component({
  selector: 'app-coin-record',
  templateUrl: './coin-record.component.html',
  styleUrls: ['./coin-record.component.css']
})
export class CoinRecordComponent implements OnInit {

  coinrecord: Coin[] = [];
  page = 0;
  paginationNumbers: number[] = [0, 1, 2];
  loading = false;

  constructor(private coinService: PromotionsService) { }

  ngOnInit(): void {
    this.getRecord()
  };


  getRecord() {
    this.loading = true;
    this.coinService.getAllCoins(this.page).subscribe(c => {
      this.coinrecord = c;
      this.loading = false;
    }, error => (this.loading = false))
  }

  changePageMiddle(page: number) {    
    this.page = page;
    this.getRecord();
  }

  changePageRight(page: number) { 
    this.updateArraypaginationNumbers(1); 
    this.page = page;
    this.getRecord();
  }

  changePageLeft(page: number) {
    if(this.paginationNumbers[0]>0){
      this.updateArraypaginationNumbers(-1);
    }         
    this.page = page;
    this.getRecord();
  }

  nextPage() {
    this.page += 1; 
    if(this.page>1){
      this.updateArraypaginationNumbers(1);
    }
    this.getRecord();
  }

  previousPage() {

    if (this.page > 0) { 
      if(this.paginationNumbers[0]>0){
        this.updateArraypaginationNumbers(-1);
      }
      this.page -= 1;
      this.getRecord();
    }

  }

  updateArraypaginationNumbers(val: number) {

    this.paginationNumbers[0] += val;
    this.paginationNumbers[1] += val;
    this.paginationNumbers[2] += val;   

  }

  addRecord(){
    
  }

}
