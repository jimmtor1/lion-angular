import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { DOC_URL } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

  tenders: Tender[] = [];
  active = true;
  conf_att_button=false;  
  urlpdf = DOC_URL;


  constructor(private tenderService: TenderService, private modalService: ModalService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAuthorizedList();
  }

  getAuthorizedList() {
    this.tenderService.getAuthorizedListTender().subscribe(list => {
      this.tenders = list;
      this.active = true;
      this.conf_att_button=false;
    }, error => {
      console.log(error);
    });
  }

  getNoAutorizedList() {
    this.tenderService.getListActiceTender().subscribe(list => {
      this.tenders = list;
      this.active = false;
      this.conf_att_button=true;
    }, error => {
      console.log(error);
    });
  }

  confirmTender(idtender: number) {
    this.tenderService.setTenderAuthorize(idtender).subscribe(t => {
      this.getNoAutorizedList();
    }, error => {
      console.log(error);
    });
  }

  unauthorize(idtender: number){
    this.tenderService.unauthorizeTender(idtender).subscribe(t =>{
      this.modalService.openModal('tender "'+ t.projectName +'" je arhiviran', 'success');
      this. getNoAutorizedList();
    });
  }

}
