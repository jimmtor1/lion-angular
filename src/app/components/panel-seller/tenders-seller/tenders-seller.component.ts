import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { SellerService } from 'src/app/services/seller.service';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-tenders-seller',
  templateUrl: './tenders-seller.component.html',
  styleUrls: ['./tenders-seller.component.css']
})
export class TendersSellerComponent implements OnInit {

  tenders: Tender[] = [];
  active = true;
  authorized: boolean;

  page = "tendertoapply";

  constructor(private tenderService: TenderService, private sellerService: SellerService) { }

  ngOnInit(): void {
    this.sellerIsActive();
  }


  getAuthorizedList() {
    if(this.authorized){
      this.tenderService.getAuthorizedListTender().subscribe(list => {
        this.tenders = list;
        this.page="tendertoapply";
        //this.active = true;
      }, error => {
        console.log(error);
      });
    }    
  }

  getNoAutorizedList() {
    this.tenderService.getListActiceTender().subscribe(list => {
      this.tenders = list;
      //this.active = false;
    }, error => {
      console.log(error);
    });
  }

  getListByUser() {

    const userid = localStorage.getItem("iduser");
    if (userid) {

      this.tenderService.getListByIduser(JSON.parse(userid)).subscribe(list => {
        this.tenders = list;
        this.page="owntender";
      }, error => {
        console.log(error);
      });
    }

  }

  sellerIsActive() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      this.sellerService.isActive(JSON.parse(usuarioString)).subscribe(b => {
        this.authorized = b;
        if (b) {
          this.getAuthorizedList();
        } else {

        }
      });
    }

  }

}
