import { Component } from '@angular/core';
import { Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'seller-company-form',
  templateUrl: './seller-company-form.component.html',
  styleUrls: ['./seller-company-form.component.css']
})
export class SellerCompanyFormComponent {

  seller : Seller = new Seller();
  selectedCategory: number;
  subcategories: Subcategory[];

  constructor(private categoryService: CategoryService){};

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
