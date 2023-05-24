import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from 'src/app/services/buyer.service';
import { FEDERATIONS, federation, selectListByFed, select_city, select_fed } from 'src/app/services/helper';

@Component({
  selector: 'app-profile-buyer',
  templateUrl: './profile-buyer.component.html',
  styleUrls: ['./profile-buyer.component.css']
})
export class ProfileBuyerComponent implements OnInit {

  buyer: Buyer;
  iduser: number;
  federations: federation[] = FEDERATIONS;
  citiesToCombo: any[] = [];
  fed: number;
  city: number;
  editmode = false;
  saving: boolean = false;
  loading:boolean = true;

  constructor(private buyerService: BuyerService, private router:Router) { }

  ngOnInit(): void {
    this.showBuyerDetail();
  }

  showBuyerDetail() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      this.iduser = JSON.parse(usuarioString);

      this.buyerService.getByIdUser(this.iduser).subscribe(buy => {
        this.buyer = buy;
        let x = select_fed(this.buyer.user.federation);
        if (x) {
          this.fed = x.id;
        }

        this.city = select_city(this.buyer.user.city).id;
        this.citiesToCombo = selectListByFed(this.buyer.user.federation);
        this.loading=false;
      }, error => {
        console.log(error);
        this.loading=false;
      });
    }

  }

  citiesCombo(event: Event) {
    let fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.buyer.user.federation = fed;
    this.citiesToCombo = selectListByFed(fed);
  }

  selectedCity(event: Event) {
    this.buyer.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

  activeEdit() {
    if(this.editmode){
      this.showBuyerDetail();
    }   
    this.editmode = !this.editmode;
  }

  save() {
    this.saving = true;
    this.buyerService.createBuyer(this.buyer).subscribe(buy => {
      this.saving = false;
    }, error => {
      console.log(error);
      this.saving = false;
    });
  }

}
