import { Component } from '@angular/core';

@Component({
  selector: 'menu-seller',
  templateUrl: './menu-seller.component.html',
  styleUrls: ['./menu-seller.component.css']
})
export class MenuSellerComponent {

  logout() {    
    localStorage.clear();
  }

}
