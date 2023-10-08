import { Component } from '@angular/core';

@Component({
  selector: 'circle-category',
  templateUrl: './circle-category.component.html',
  styleUrls: ['./circle-category.component.css']
})
export class CircleCategoryComponent {

  categories = [
    { name: 'Građevina', imageUrl: 'assets/images/building.jpg' , url: '/subcategoryList2/1' },
    { name: 'Sve za kuću', imageUrl: 'assets/images/home.jpg', url: '/subcategoryList2/2' },
    { name: 'Informatika', imageUrl: 'assets/images/tecnology.jpg', url: '/subcategoryList2/3' },
    { name: 'Odjeća', imageUrl: 'assets/images/clothes.jpg', url: '/subcategoryList2/4' },
    { name: 'Auto / Moto', imageUrl: 'assets/images/automoto.jpg', url: '/subcategoryList2/215' },
    { name: 'Teretni program', imageUrl: 'assets/images/truck.jpg', url: '/subcategoryList2/216' }    
  ];

  shop = {name: 'Svi proizvodi / Usluge', imageUrl: 'assets/images/shop icon.jpeg', url: 'subcategoryList2/5'}

}
