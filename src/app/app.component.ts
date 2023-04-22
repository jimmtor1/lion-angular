import { Component } from '@angular/core';

import { AuthService } from './services/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  email: string = "";

  constructor(private auth: AuthService) {
    const usuarioString = localStorage.getItem("email");    
    if (usuarioString) {
      this.email = JSON.parse(usuarioString);      
    } else {      
    }
  }

  


  // get user(): string {
  //   return this.auth.user;
  // }

}
