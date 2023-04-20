import { Component, OnInit, ViewChild } from '@angular/core';
import { Userr } from './models/userr';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environment';
import { AuthService } from './services/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private auth:AuthService){}
  
  get user(): string {
    return this.auth.user;
  }

}
