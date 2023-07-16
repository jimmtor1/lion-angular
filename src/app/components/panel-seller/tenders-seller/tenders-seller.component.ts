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
  selectedType: number=0;

  page = "tendertoapply";

  constructor(private tenderService: TenderService, private sellerService: SellerService) { }

  ngOnInit(): void {
    this.sellerIsActive();
  }


  getAuthorizedList() {
    if (this.authorized) {
      this.tenderService.getAuthorizedListTender().subscribe(list => {
        this.tenders = list;
        this.page = "tendertoapply";
      }, error => {
        console.log(error);
      });
    } else {
      this.tenders = [];
      this.page = "tendertoapply";
    }
    this.active = true;
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
        this.active = false
        this.page = "owntender";
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


  filter() {
    if (this.selectedType > 0) {
      this.tenderService.getListByType(this.selectedType).subscribe(t => {
        this.tenders = t;
      });
    }
  }

}
