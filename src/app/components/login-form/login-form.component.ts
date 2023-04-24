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
    const roleString = localStorage.getItem("role");    
    if (roleString) {
     
      if(JSON.parse(roleString)==1){
        this.router.navigate(['']);        
      } else if(JSON.parse(roleString)==2){
        this.router.navigate(['sellerpanel']);
      }else if(JSON.parse(roleString)==3){
        this.router.navigate(['adminPanel']);
      } 
    } else {
           
    }

  }

  login(){   
    this.userService.isValidUser(this.user).subscribe(data=>{
      
      if(data){  
        localStorage.setItem("iduser",JSON.stringify(data.id));
        localStorage.setItem("email",JSON.stringify(data.email));
        
        localStorage.setItem("role",JSON.stringify(data.role.id));

        location.reload();
        // this.router.navigate(['']);
      }else{    
        localStorage.clear  
        this.access = 2;    
      }
    }, error => {console.log(error)})
  }


  

}

