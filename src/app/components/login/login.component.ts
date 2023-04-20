import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Userr } from 'src/app/models/userr';
import { AuthService } from 'src/app/services/helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // @Output() valueEmitted = new EventEmitter<Userr>();

  user:Userr = new Userr();
  
  access:number = 0; //0-no access, 1-acces, 2-wrong password

  constructor(private userService:UserService, private authService:AuthService, private router:Router){}

  login(){   
    this.userService.isValidUser(this.user).subscribe(data=>{
      
      if(data){  
        this.user = data;         
        this.authService.user = this.user.email;
        this.authService.idprovider = this.user.id;
        this.access = 1;
        this.router.navigate(['panelAnuncios']);
      }else{
        this.authService.user = ""; 
        this.authService.idprovider = 0;
        this.access = 2;
      }
    }, error => {console.log(error)})
  }


}
