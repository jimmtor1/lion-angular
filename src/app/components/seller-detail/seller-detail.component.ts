import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnInit {

  seller: Seller = new Seller();
  selectedCategory: number;
  subcategories: Subcategory[];
  iduser: number;
  @Input() id: number;

  constructor(private categoryService: CategoryService, private sellerService: SellerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const roleString = localStorage.getItem("role");
    if (roleString) { //if is role admin
      if (JSON.parse(roleString) == 3) {
        this.iduser = this.id;
        this.getSeller();
      } else { //if role is different admin

        const usuarioString = localStorage.getItem("iduser");
        if (usuarioString) {

          if (JSON.parse(usuarioString) > 0) {
            this.iduser = JSON.parse(usuarioString);
            this.getSeller();
          }
        }
      }
    }else{

      this.route.params.subscribe(param => {

        if (param['id'] != null) {
          this.iduser = param['id'];
          this.getSeller();
        }

      })

    }


  }

  getSeller() {
    this.sellerService.getById(this.iduser).subscribe(sellerBd => {
      this.seller = sellerBd;
    });
  }

  subcategoriesCombo(event: Event) {
    this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);
    //this.product.idcategory = this.selectedCategory; 

    this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  selectedSub(event: Event) {
    // this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  }






}
