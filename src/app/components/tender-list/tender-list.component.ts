import { Component } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})

export class TenderListComponent {

  tenders: Tender[] = [];
  iduser: number;
  loading: boolean = true;
  detail: number = 0;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.getList()    
  }

  getList() {
    this.tenderService.getAuthorizedListTender().subscribe(list => {
      this.tenders = list;
      // console.log(this.tenders);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getListByUser() {

    const userid = localStorage.getItem("iduser");
    if (userid) {

      this.tenderService.getListByIduser(JSON.parse(userid)).subscribe(list => {
        this.tenders = list;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }

  }

  

  showTenderDetail(idtender: number) {
    this.detail = idtender;
  }

}
