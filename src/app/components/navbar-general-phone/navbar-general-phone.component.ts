import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'navbar-general-phone',
  templateUrl: './navbar-general-phone.component.html',
  styleUrls: ['./navbar-general-phone.component.css']
})
export class NavbarGeneralPhoneComponent implements OnInit {
 
  role:number=0;
  showChats: boolean = false;

  constructor(private router:Router, private chatSercice: ModalService){}

  ngOnInit(): void {
    const roleString = localStorage.getItem("role");
    if (roleString) {
      this.role = JSON.parse(roleString);
    }
  }

  show_chats() { 
    this.chatSercice.openChat(-1);
    if(this.role>0){
      this.showChats = !this.showChats;
    }else{
      this.router.navigate(['login']);
    }  
    
  }

  

  receiveValue(value: boolean) {    
    this.showChats = value;
  }

}
