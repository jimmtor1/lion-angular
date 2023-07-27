import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ChatComponent implements OnInit {

  @ViewChild('messageContainer') messageContainer: ElementRef;

  msg: Message = new Message();
  user: number;

  chatMessages: Message[] = [];
  LastMessageEachChat: Message[];
  thisidUser: number;
  chatingWhit: string | undefined;
  activeChat: number;

  page = 0;

  constructor(private websocketService: ChatSocketService, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

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
                //this.msg.receiver = u;
                this.chatingWhit = u.firstName + u.lastName;
                this.user = u.id;
              });

              this.msg.idchat = 0;
              this.activeChat = 0;
              this.msg.sender = this.thisidUser;
            }
          });
        }
      });

      this.messageService.getLastMsgByChat(this.thisidUser).subscribe(m => {
        this.LastMessageEachChat = m;
      });

      this.websocketService.msgState$.subscribe((a) => {

        if (a.x.idChat == 0) {
          this.activeChat = a.x.idChat;
          this.chatMessages.push(a.x);
        } else if (a.x.idChat == this.activeChat) {
          this.chatMessages.push(a.x);
        } else if (a.x.receiver.id == this.user) {
          this.chatMessages.push(a.x);
        }

        const index = this.LastMessageEachChat.findIndex(obj => obj.idchat == a.x.idChat);
        index !== -1 ? this.LastMessageEachChat[index] = a.x : this.LastMessageEachChat.push(a.x);

      });



    } else {
      this.router.navigate(['/login']);
    }


  }

  getChats(idchat: number) {

    this.messageService.getMessagesByChat(idchat, this.thisidUser,this.page).subscribe(c => {
      this.chatMessages = c;
      this.msg.idchat = idchat;
      this.activeChat = idchat;

      const message_extracted = this.LastMessageEachChat.find(item => item.idchat === idchat);

      if (message_extracted?.sender == this.thisidUser) {
        //this.msg.receiver = message_extracted.receiver;
        this.msg.sender = message_extracted.sender;
        //this.chatingWhit = message_extracted.receiver.firstName + message_extracted?.sender.lastName;
        //this.user = message_extracted.receiver.id;
      } else {
        //this.msg.receiver = message_extracted?.sender!;
        //this.msg.sender = message_extracted?.receiver!;
        //this.chatingWhit = message_extracted?.sender.firstName + message_extracted?.sender.lastName!;
        //this.user = message_extracted?.sender.id!;
      }

      setTimeout(() => {
        this.scrollMessageContainerToBottom();
      }, 0);

    });

  }

  connect() {
    this.websocketService._connect();
  }

  disconnect() {
    this.websocketService._disconnect();
  }

  sendMessage() {

    if (this.msg.content.length > 0) {
      this.msg.dateTime = new Date();
      this.websocketService._send(this.msg);

      if (this.msg.idchat !== 0) {
        const newMsg = { ...this.msg };
        this.chatMessages.push(newMsg);
        const index = this.LastMessageEachChat.findIndex(obj => obj.idchat == this.msg.idchat);
        index !== -1 ? this.LastMessageEachChat[index] = newMsg : this.LastMessageEachChat.push(newMsg);
      }

      this.msg.content = "";
      setTimeout(() => {
        this.scrollMessageContainerToBottom();
      }, 0);
    }

  }



  // Método para hacer scroll automático hacia abajo
  scrollMessageContainerToBottom() {
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

}
