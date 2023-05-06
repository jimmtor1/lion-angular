import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent {

  @Output() SellerEditEvent = new EventEmitter<number>();
  @Input() accepted:boolean;

  sellers:Seller[];

  constructor(private sellerService:SellerService){}
  
  ngOnInit(): void {
    if(this.accepted){
      this.getAccepted();
    }else{
      this.getProgress();
    }
    
  }

  getAccepted(){
    this.sellerService.getAllAccepted().subscribe(list =>{      
      this.sellers = list;
    });
  }

  getProgress(){
    this.sellerService.getAllProcess().subscribe(list =>{      
      this.sellers = list;
    });
  }

  emitSellerEdit(idseller:number){
    this.SellerEditEvent.emit(idseller);
  }

  confirm(idseller:number){
    this.sellerService.acceptById(idseller).subscribe(list =>{      
      location.reload();
    });
  }

}
