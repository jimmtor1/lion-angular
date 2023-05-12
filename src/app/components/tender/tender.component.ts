import { Component, OnInit } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})

export class TenderComponent implements OnInit {

  tenders: Tender[] = [];
  iduser: number;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      if (JSON.parse(usuarioString) > 0) {
        this.iduser = JSON.parse(usuarioString);
        this.getList();
      }

    }
  }

  getList() {
    this.tenderService.getListByIduser(this.iduser).subscribe(list => {
      this.tenders = list;
    });
  }

}
