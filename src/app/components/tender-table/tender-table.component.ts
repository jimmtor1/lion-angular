import { Component } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender-table',
  templateUrl: './tender-table.component.html',
  styleUrls: ['./tender-table.component.css']
})
export class TenderTableComponent {

  tenders: Tender[] = [];
  iduser: number;
  loading: boolean = true;
  detail:number=0;
  role = 0;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {

    // const usuarioString = localStorage.getItem("iduser");
    // if (usuarioString) {

    //   if (JSON.parse(usuarioString) > 0) {
    //     this.iduser = JSON.parse(usuarioString);
    //     this.getList();
    //   }

    // }


    const roleString = localStorage.getItem("role");
    if (roleString) {

      if (JSON.parse(roleString) == 1) {
        this.getListByUser();        
      } else if (JSON.parse(roleString) == 2) {
        this.getListByUser();
      } else if (JSON.parse(roleString) == 3) {
        this.role = 3;
        this.getList();
      }
    }

  }

  getList() {
    this.tenderService.getListActiceTender().subscribe(list => {
      this.tenders = list;
      console.log(this.tenders);
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

  confirmTender(idtender:number){
    this.tenderService.setTenderAuthorize(idtender).subscribe(t=>{
      this.getList();
    });
  }

  showTenderDetail(idtender:number){
    this.detail = idtender;
  }

}
