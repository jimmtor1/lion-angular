import { Component } from '@angular/core';

@Component({
  selector: 'menu-buyer',
  templateUrl: './menu-buyer.component.html',
  styleUrls: ['./menu-buyer.component.css']
})
export class MenuBuyerComponent {

  logout() {    
    localStorage.clear();
  }

}
