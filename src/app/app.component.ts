import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  email: string = "Login";
  role:number=0;

  constructor(private router:Router) {

    const usuarioString = localStorage.getItem("email");    
    if (usuarioString) {
      this.email = JSON.parse(usuarioString);      
    } 

    const roleString = localStorage.getItem("role"); 
    if(roleString){
      this.role = JSON.parse(roleString);
    }

  }

  direction(){
    const roleString = localStorage.getItem("role");    
    if (roleString) {
      if(JSON.parse(roleString)==1){
        this.router.navigate(['/productCategoryList/5/0']);       
      }
    } else{
      this.router.navigate(['login']);
    }
    
  }

  logout(){    
    localStorage.clear();
    this.router.navigate([''])
    this.email = "Login"; 
    // location.reload();    
  }

}
