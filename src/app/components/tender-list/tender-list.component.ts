import { Component } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { SellerService } from 'src/app/services/seller.service';
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
  authorized:boolean;

  constructor(private tenderService: TenderService, private sellerService: SellerService) { }

  ngOnInit(): void {
    
    const rol = localStorage.getItem("role");
    if (rol) {
      if (JSON.parse(rol) == 2) {
        
        const usuarioString = localStorage.getItem("iduser");        
        if (usuarioString) {
          
          this.sellerService.isActive(JSON.parse(usuarioString)).subscribe(b => {
            this.authorized = b;            
            if (b) {              
              this.getList();
            }else{
              this.loading = false;
            }
          });
        }

      } else {
        this.authorized = true;
        this.getList();
      }
    }
  }



  getList() {
    this.tenderService.getAuthorizedListTender().subscribe(list => {
      this.tenders = list;
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
