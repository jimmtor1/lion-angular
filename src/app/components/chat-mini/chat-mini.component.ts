import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { Userr } from 'src/app/models/userr';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-mini',
  templateUrl: './chat-mini.component.html',
  styleUrls: ['./chat-mini.component.css']
})
export class ChatMiniComponent implements OnInit {

  @Output() closeChats = new EventEmitter<boolean>();
  @Input() idprovider: number | undefined;
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  isMobile: boolean = false;

  msg: Message = new Message();
  user: number;

  chatMessages: Message[] = [];
  LastMessageEachChat: Message[] = [];
  thisidUser: number;
  chatingWhit: string | undefined;
  activeChat: number | undefined;
  minimized = false;

  constructor(private websocketService: ChatSocketService, private messageService: MessageService, private userService: UserService, private router: Router, private chatclose: ModalService) { }


  ngOnInit() {

    let iduser = localStorage.getItem('iduser');
    if (iduser) {
      this.thisidUser = parseInt(iduser)

      if (this.idprovider) {
        if (this.idprovider > 0) {

          this.messageService.getLastMsgByChat(parseInt(iduser)).subscribe(m => {
            this.LastMessageEachChat = m;
            this.sortByDateDesc();
            this.messageService.getMessagesWith(this.thisidUser, this.idprovider!).subscribe(chat => {             
              if (chat) {
                this.getChats(chat.id);
              } else {
                this.userService.getById(this.idprovider!).subscribe(u => {
                  this.msg.receiver = u;
                  this.chatingWhit = u.firstName + " " + u.lastName;
                  this.user = u.id;
                });

                this.msg.idChat = 0;
                this.activeChat = 0;
                this.msg.sender = new Userr(this.thisidUser);
              }
            });

          });



        } else {
          this.messageService.getLastMsgByChat(parseInt(iduser)).subscribe(m => {
            this.LastMessageEachChat = m;
            this.sortByDateDesc();
          });
        }
      } else {
        this.messageService.getLastMsgByChat(parseInt(iduser)).subscribe(m => {
          this.LastMessageEachChat = m;
          this.sortByDateDesc();
        });
      }



      this.websocketService.msgState$.subscribe((a) => {

        if (a.x.idChat == 0) {
          this.activeChat = a.x.idChat;
        }

        this.chatMessages.push(a.x);

        const index = this.LastMessageEachChat.findIndex(obj => obj.idChat == a.x.idChat);
        index !== -1 ? this.LastMessageEachChat[index] = a.x : this.LastMessageEachChat.push(a.x);

        this.playNotificationSound();
        setTimeout(() => {
          this.scrollMessageContainerToBottom();
        }, 0);

      });

    } else {
      this.router.navigate(['/login']);
    }

    this.checkDeviceType();

  }

  getChats(idchat: number) {
    this.messageService.getMessagesByChat(idchat).subscribe(c => {
      this.chatMessages = c;

      this.msg.idChat = idchat;
      this.activeChat = idchat;

      if (this.LastMessageEachChat.length > 0) {
        const message_extracted = this.LastMessageEachChat.find(item => item.idChat === idchat);

        if (message_extracted?.sender.id == this.thisidUser) {
          this.msg.receiver = message_extracted.receiver;
          this.msg.sender = message_extracted.sender;
          this.chatingWhit = message_extracted.receiver.firstName + " " + message_extracted.receiver.lastName;
        } else {
          this.msg.receiver = message_extracted?.sender!;
          this.msg.sender = message_extracted?.receiver!;
          this.chatingWhit = message_extracted?.sender.firstName + " " + message_extracted?.receiver.lastName!;
        }
      }


      setTimeout(() => {
        this.scrollMessageContainerToBottom();
      }, 0);
    });

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
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  closeMsgBox() {
    //this.activeChat = 0;
    this.chatclose.openChat(0);
  }

  back() {   
    if (this.LastMessageEachChat.length == 0) {
      this.messageService.getLastMsgByChat(this.thisidUser).subscribe(m => {
        this.LastMessageEachChat = m;
        this.sortByDateDesc();
      });
    }
    this.activeChat = undefined;  
  }

  minimizeMsgBox() {
    this.minimized = !this.minimized;
  }

  playNotificationSound() {
    const audioElement = this.audioPlayer.nativeElement;
    audioElement.play();
  }

  sendBooleanValue(value: boolean) {
    this.closeChats.emit(value);
  }

  checkDeviceType() {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth < 576; // Establece la condición para dispositivos móviles según el ancho de la pantalla
    // if (this.isMobile) {
    //   this.renderer.addClass(document.body, 'mobile'); // Agrega la clase 'mobile' al elemento <body> si es un dispositivo móvil
    // }
  }

  sortByDateDesc() {
    this.LastMessageEachChat.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }


}
