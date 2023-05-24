import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender-buyer',
  templateUrl: './tender-buyer.component.html',
  styleUrls: ['./tender-buyer.component.css']
})
export class TenderBuyerComponent implements OnInit {

  tenders: Tender[] = [];

  constructor(private tenderService: TenderService){}

  ngOnInit(): void {
    this.getListByUser();
  }

  getListByUser() {

    const userid = localStorage.getItem("iduser");
    if (userid) {

      this.tenderService.getListByIduser(JSON.parse(userid)).subscribe(list => {
        this.tenders = list;               
      }, error => {
        console.log(error);
      });
    }

  }

}
