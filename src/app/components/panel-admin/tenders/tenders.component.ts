import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

  tenders: Tender[] = [];
  active = true;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.getAuthorizedList();
  }

  getAuthorizedList() {
    this.tenderService.getAuthorizedListTender().subscribe(list => {
      this.tenders = list;
      this.active = true;
    }, error => {
      console.log();
    });
  }

  getNoAutorizedList() {
    this.tenderService.getListActiceTender().subscribe(list => {
      this.tenders = list;
      this.active = false;
    }, error => {
      console.log();
    });
  }

  confirmTender(idtender: number) {
    this.tenderService.setTenderAuthorize(idtender).subscribe(t => {
      this.getNoAutorizedList();
    });
  }

}
