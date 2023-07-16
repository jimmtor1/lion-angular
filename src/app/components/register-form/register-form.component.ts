import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { Buyer } from 'src/app/models/buyer';
import { Seller } from 'src/app/models/seller';
import { Userr } from 'src/app/models/userr';
import { BuyerService } from 'src/app/services/buyer.service';
import { CategoryService } from 'src/app/services/category.service';
import { FEDERATIONS, federation, selectListByFed } from 'src/app/services/helper';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  buyer: Buyer = new Buyer();
  seller: Seller = new Seller();
  user: Userr = new Userr();
  citiesToCombo: any[];
  isSeller: boolean = false;
  public isMobile$: Observable<boolean>;
  modalShow = false;
  pw_confirm = "";
  pw_different = false;

  federations: federation[] = FEDERATIONS;
  fed: number;
  city: number;

  //modal values
  name = "";
  result = "";

  @ViewChild('miModal') miModal: any;


  constructor(private buyerService: BuyerService, private router: Router, private categoryService: CategoryService) {
    this.isMobile$ = fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth <= 768),
      startWith(window.innerWidth <= 768)
    );
  }

  ngOnInit(): void {

  }

  sellerSelected(event: Event) {

    if ((<HTMLInputElement>event.target).value == "seller") {
      this.isSeller = true;

    } else {
      this.isSeller = false;
    }

  }

  // selectedSub(event: Event) {
  //   this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  // }

  saveBuyer() {

    this.buyerService.createBuyer(this.buyer).subscribe(dato => {
      if (dato) {
        this.modalShow = true;
        this.name = dato.user.firstName;
        this.result = "Registracija nije završena";
      } else {
        this.result = "Registracija je uspješno završena";
      }

      //this.router.navigate(['login']);
    }, error => {
      this.modalShow = true;
      console.log(error);
      this.result = "Registracija je uspješno završena";
    });
  }

  saveSeller() {
    this.buyerService.createSeller(this.seller).subscribe(dato => {

      if (dato) {
        this.modalShow = true;
        this.name = dato.user.firstName;
        this.result = "Registracija je uspješno završena";
      } else {
        this.result = "Registracija je uspješno završena";
      }    
    }, error => {
      this.modalShow = true;
      this.result = "Registracija je uspješno završena";
      console.log(error);
    }


    );
  }

  onSubmit() {
    if (this.isSeller) {
      if (this.pw_confirm == this.user.password) {
        this.pw_different = false;
        this.user.role.id = 2;
        this.seller.user = this.user;
        this.saveSeller();
      } else {
        this.pw_different = true;
      }
    } else {      
      if (this.pw_confirm == this.user.password) {
        this.pw_different = false;
        this.user.role.id = 1;
        this.buyer.user = this.user;
        this.saveBuyer();
      }else{
        this.pw_different = true;
      }
    }

  }

  // subcategoriesCombo(event: Event) {    
  //   this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);    
  //   this.product.idcategory = this.selectedCategory; 

  //   this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
  //     this.subcategories = subcategories;
  //   });
  // }

  citiesCombo(event: Event) {
    const fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.user.federation = fed;
    this.citiesToCombo = selectListByFed(fed);
  }

  selectedCity(event: Event) {
    this.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

  closeModal() {
    this.modalShow = false;
    this.router.navigate(['login']);
  }




}


