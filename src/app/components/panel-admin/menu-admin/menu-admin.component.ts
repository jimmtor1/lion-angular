import { Component } from '@angular/core';

@Component({
  selector: 'menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  logout() {    
    localStorage.clear();
  }

}
