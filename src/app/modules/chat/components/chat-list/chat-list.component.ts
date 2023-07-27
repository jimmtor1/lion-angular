import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatRoom } from 'src/app/models/chat-room';
import { Message } from 'src/app/models/message';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  ChatList: ChatRoom[] = [];
  constructor(private msgService: MessageService, private websocketService: ChatSocketService) { }
  thisidUser: number = 0;
  @ViewChild('messageContainer') messageContainer: ElementRef;
  
  loading=false;

  ngOnInit(): void {
    
    this.thisidUser = localStorage.getItem('iduser') ? parseInt(localStorage.getItem('iduser')!) : 0;
    
    if (this.thisidUser > 0) {
      this.msgService.getLastMsgByChat2(this.thisidUser).subscribe(x => {           
        this.ChatList = x;      
        this.suscribeAchat();
      });
    }

  }

  suscribeAchat() {
    
    this.websocketService.msgState$.subscribe((a) => {
      this.incomingMessage(a.x);
    });

  }

  incomingMessage(msg: Message) {
    
    if (this.ChatList) {      
      this.getRooms();
      this.playNotificationSound();
    }    

    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

  }

  getRooms() {
    if (this.thisidUser) {
      this.loading = true;
      console.log("getRooms");
      this.msgService.getLastMsgByChat2(this.thisidUser).subscribe(m => {
        this.ChatList = m;
        this.loading = false;
        console.log(this.ChatList);
      });
    }    
  }

   

  sortByDateDesc() {     
       
    this.ChatList.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }

  scrollMessageContainerToBottom() {
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  playNotificationSound() {
    const audio = new Audio('assets/sound/notification-mouth.wav');
    audio.play();
  }

}
