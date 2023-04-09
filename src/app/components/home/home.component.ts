import { Component } from '@angular/core';
import { faBagShopping, faMagnifyingGlass, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  faMagnifyingGlass = faMagnifyingGlass;  
  faRotate = faRotate;
  faHeart = faHeart;
  faUser = faUser;
  fasUser = faUser;
  faBagShopping = faBagShopping;
}
