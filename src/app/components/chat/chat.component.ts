import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { Userr } from 'src/app/models/userr';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @ViewChild('messageContainer') messageContainer: ElementRef;

  msg: Message = new Message();
  user: number;

  chatMessages: Message[] = [];
  LastMessageEachChat: Message[];
  // subscriptions: number[] = [];
  thisidUser: number;
  chatingWhit: string | undefined;
  activeChat: number;

  constructor(private websocketService: ChatSocketService, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    let iduser = localStorage.getItem('iduser');
    if (iduser) {

      this.thisidUser = parseInt(iduser);

      this.route.params.subscribe(param => {
        if (param['iduser']) {
          this.messageService.getMessagesWith(this.thisidUser, param['iduser']).subscribe(chat => {
            if (chat) {
              this.getChats(chat.id);
            } else {
              this.userService.getById(param['iduser']).subscribe(u => {
                this.msg.receiver = u;
                this.chatingWhit = u.firstName;
                this.user = u.id;
              });

              this.msg.idChat = 0;
              this.activeChat = 0;
              this.msg.sender = new Userr(this.thisidUser);
            }
          });
        }
      });



      this.messageService.getLastMsgByChat(this.thisidUser).subscribe(m => {

        this.LastMessageEachChat = m;
      });
    }

    this.websocketService.msgState$.subscribe((a) => {

      if (a.x.idChat == 0) {
        this.activeChat = a.x.idChat;
        this.chatMessages.push(a.x);
      } else if (a.x.idChat == this.activeChat) {
        this.chatMessages.push(a.x);
      } else if (a.x.receiver.id == this.user) {
        this.chatMessages.push(a.x);
      }

      const index = this.LastMessageEachChat.findIndex(obj => obj.idChat == a.x.idChat);
      index !== -1 ? this.LastMessageEachChat[index] = a.x : this.LastMessageEachChat.push(a.x);

      setTimeout(() => {
        this.scrollMessageContainerToBottom();
      }, 0);
    });

    this.websocketService.userToSuscribe = this.thisidUser;
    this.connect();

  }

  getChats(idchat: number) {

    this.messageService.getMessagesByChat(idchat).subscribe(c => {
      this.chatMessages = c;
      // if (!this.subscriptions.includes(idchat)) {
      //   this.websocketService._suscribe_chat(idchat);
      //   this.subscriptions.push(idchat);
      // }
      this.msg.idChat = idchat;
      this.activeChat = idchat;



      const message_extracted = this.LastMessageEachChat.find(item => item.idChat === idchat);

      if (message_extracted?.sender.id == this.thisidUser) {
        this.msg.receiver = message_extracted.receiver;
        this.msg.sender = message_extracted.sender;
        this.chatingWhit = message_extracted.receiver.firstName;
      } else {
        this.msg.receiver = message_extracted?.sender!;
        this.msg.sender = message_extracted?.receiver!;
        this.chatingWhit = message_extracted?.sender.firstName;
      }


    });

  }

  connect() {
    this.websocketService._connect();
  }

  disconnect() {
    this.websocketService._disconnect();
  }

  sendMessage() {
    this.msg.dateTime = new Date();
    this.websocketService._send(this.msg);

    if (this.msg.idChat !== 0) {
      const newMsg = { ...this.msg };
      this.chatMessages.push(newMsg);
      const index = this.LastMessageEachChat.findIndex(obj => obj.idChat == this.msg.idChat);
      index !== -1 ? this.LastMessageEachChat[index] = newMsg : this.LastMessageEachChat.push(newMsg);
    }

    this.msg.content = "";
    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

  }



  // Método para hacer scroll automático hacia abajo
  scrollMessageContainerToBottom() {
    console.log("cscroll")
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

}
