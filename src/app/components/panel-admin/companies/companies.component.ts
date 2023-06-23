import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  sellers:Seller[];
  active = true;
  // @Output() SellerEditEvent = new EventEmitter<number>();

  constructor(private sellerService:SellerService){}

  ngOnInit(): void {
    this.getAccepted();
  }

  getAccepted(){
    this.sellerService.getAllAccepted().subscribe(list =>{      
      this.sellers = list; 
      this.active = true;     
    });
  }

  getProgress(){
    this.sellerService.getAllProcess().subscribe(list =>{      
      this.sellers = list;
      this.active = false;  
    });
  }

  confirm(idseller:number){
    this.sellerService.acceptById(idseller).subscribe(list =>{      
      location.reload();
    });
  }

  deactivate(idseller:number){
    this.sellerService.deactivateById(idseller).subscribe(list =>{      
      location.reload();
    });
  }

  // emitSellerEdit(idseller:number){
  //   this.SellerEditEvent.emit(idseller);
  // }
  
}
