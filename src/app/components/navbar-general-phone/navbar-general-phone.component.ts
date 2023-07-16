import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'navbar-general-phone',
  templateUrl: './navbar-general-phone.component.html',
  styleUrls: ['./navbar-general-phone.component.css']
})
export class NavbarGeneralPhoneComponent implements OnInit {
 
  role:number=0;
  showChats: boolean = false;
  msg_alert: number = 0;

  constructor(private router:Router, private chatSercice: ModalService, private websocketService: ChatSocketService, private route:ActivatedRoute){}

  ngOnInit(): void {
    const roleString = localStorage.getItem("role");
    if (roleString) {
      this.role = JSON.parse(roleString);
    }
    this.sucribe();
  }

  show_chats() { 
    this.chatSercice.openChat(-1);
    if(this.role>0){
      this.showChats = !this.showChats;
    }else{
      this.router.navigate(['login']);
    }
  }

  sucribe(){
    this.websocketService.msgState$.subscribe(a => {     
      if (!this.router.url.includes("/chat2/msg")) {
        this.msg_alert += 1;
        this.playNotificationSound();
      }
    });
  }
  

  receiveValue(value: boolean) {    
    this.showChats = value;
  }

  panelredirect(){
    const roleString = localStorage.getItem("role");
    if (roleString) {

      if (JSON.parse(roleString) == 1) {
        this.router.navigate(['paneluser']);
      } else if (JSON.parse(roleString) == 2) {
        this.router.navigate(['panelseller']);
      } else if (JSON.parse(roleString) == 3) {
        this.router.navigate(['paneladmin']);
      }
    } else {      
      this.router.navigate(['/login']);
    }

  }

  playNotificationSound() {
    const audio = new Audio('assets/sound/notification-mouth.wav');
    audio.play();   
  }

}
