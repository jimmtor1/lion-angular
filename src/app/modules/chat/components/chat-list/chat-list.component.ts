import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  ChatList: Message[] = [];
  constructor(private msgService: MessageService, private websocketService: ChatSocketService) { }
  thisidUser: number = 0;
  @ViewChild('messageContainer') messageContainer: ElementRef;

  ngOnInit(): void {

    this.thisidUser = localStorage.getItem('iduser') ? parseInt(localStorage.getItem('iduser')!) : 0;

    if (this.thisidUser > 0) {
      this.msgService.getLastMsgByChat(this.thisidUser).subscribe(x => {
        x.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());       
        MessageService.setChatList(x);
        this.ChatList = MessageService.getChatList();
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
      //show in listchat        
      const index = this.ChatList.findIndex(obj => obj.idChat == msg.idChat);
      msg.seen= false;  
      index !== -1 ? this.ChatList[index] = msg : this.ChatList.push(msg);
      this.sortByDateDesc();
    } 

    this.playNotificationSound();

    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

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
