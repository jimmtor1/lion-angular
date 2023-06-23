import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, startWith, Observable } from 'rxjs';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  email: string = "Prijava";
  role: number = 0;
  word = "";
  msg_alert: number = 0
  showChats: boolean = false;


  public isMobile$: Observable<boolean>;

  constructor(private router: Router, private websocketService: ChatSocketService, private chatSercice:ModalService) {

    this.isMobile$ = fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth <= 768),
      startWith(window.innerWidth <= 768)
    );

    const usuarioString = localStorage.getItem("email");
    if (usuarioString) {
      this.email = JSON.parse(usuarioString);
    }

    const roleString = localStorage.getItem("role");
    if (roleString) {
      this.role = JSON.parse(roleString);
    }

    const iduser = localStorage.getItem("iduser");
    if (iduser) {
      this.websocketService.userToSuscribe = parseInt(iduser);
      this.websocketService._connect();
    }


    this.websocketService.msgState$.subscribe(a => {
      if (!this.showChats) {
        this.msg_alert += 1;
      }
    });

  }

  direction() {
    const roleString = localStorage.getItem("role");
    if (roleString) {
      if (JSON.parse(roleString) == 1) {
        this.router.navigate(['/productCategoryList/5/0']);
      }
    } else {
      this.router.navigate(['login']);
    }

  }

  search() {
    console.log("word: " + this.word)
    if (this.word !== '') {
      this.router.navigate(['search', this.word]);
    }
  }

  show_chats() {
    this.chatSercice.openChat(-1);
    // this.showChats = !this.showChats; 
    this.msg_alert = 0;   
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
  

}
