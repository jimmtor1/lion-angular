import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Userr } from 'src/app/models/userr';
import { AuthService } from 'src/app/services/helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user:Userr = new Userr();
  
  access:number = 0; //0-no access, 1-acces, 2-wrong password

  constructor(private userService:UserService, private authService:AuthService, private router:Router){}
  
  ngOnInit(): void {
    const usuarioString = localStorage.getItem("iduser");    
    if (usuarioString) {
      if(JSON.parse(usuarioString)>0){
        this.router.navigate(['sellerpanel']);        
      }   
    } else {      
    }

  }

  login(){   
    this.userService.isValidUser(this.user).subscribe(data=>{
      
      if(data){  
        localStorage.setItem("iduser",JSON.stringify(data.id));
        localStorage.setItem("email",JSON.stringify(data.email));

        //this.user = data;         
        // this.authService.user = this.user.email;
        // this.authService.idprovider = this.user.id;
        //this.access = 1;
        location.reload();
        this.router.navigate(['']);
      }else{
        localStorage.setItem("iduser","0");
        localStorage.setItem("email","");
        // this.authService.user = ""; 
        // this.authService.idprovider = 0;
        // this.access = 2;
      }
    }, error => {console.log(error)})
  }


}
