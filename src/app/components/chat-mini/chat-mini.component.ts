import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatRoom } from 'src/app/models/chat-room';
import { Message } from 'src/app/models/message';
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

  //chatMessages: Message[] = [];
  LastMessageEachChat: ChatRoom[] = [];
  thisidUser: number;
  chatingWhit: string | undefined;
  activeChat: number | undefined;
  minimized = false;
  loading: boolean;
  scrollPosition = 0;

  chatGroups2: Map<string, Message[]> = new Map();
  dateOrder: string[];

  chatGroups: any[] = [];

  page = 0;

  chatsListActive: boolean = false;

  constructor(private websocketService: ChatSocketService, private messageService: MessageService, private userService: UserService, private chatclose: ModalService) { }


  ngOnInit() {

    this.suscribeAchat();

    let iduser = localStorage.getItem('iduser');
    if (iduser) {

      this.thisidUser = parseInt(iduser);
      if (this.idprovider && this.idprovider > 0) {

        this.messageService.getMessagesWith(this.thisidUser, this.idprovider!).subscribe(chat => {

          if (chat) {
            this.chatingWhit = chat.users[0].id !== this.thisidUser ? chat.users[0].firstName + " " + chat.users[0].lastName : chat.users[1].firstName + " " + chat.users[1].lastName;
            this.getChats(chat.id);
          } else {

            this.userService.getById(this.idprovider!).subscribe(u => {

              this.chatingWhit = u.firstName + " " + u.lastName;
              this.user = u.id;

            });
            this.activeChat = -1;
            this.msg.idchat = 0;
            this.msg.sender = this.thisidUser;
          }
        });

      } else {
        this.getRooms();
      }

    }
    this.checkDeviceType();
  }

  getChats(idchat: number, chatingWith?: string, idchatingWith?: number) {


    if (!this.activeChat) {
      this.activeChat = -1;
    }

    this.chatsListActive = false;
    this.loading = true;

    this.activeChat = idchat;
    if (chatingWith) {
      this.chatingWhit = chatingWith;
    }
    if (idchatingWith) {
      this.idprovider = idchatingWith;
    }

    this.messageService.getMessagesByChat(idchat, this.thisidUser,this.page).subscribe(c => {

      let messages: Message[] = c.content;
      this.groupChatsByDate(messages);

      setTimeout(() => {
        
        //console.log("c: " + JSON.stringify(this.chatMessages));
        const index = this.LastMessageEachChat.findIndex(obj => obj.idchat == idchat);
        index !== -1 ? this.LastMessageEachChat[index].seen=true : this.LastMessageEachChat[index].seen=false;
      
        setTimeout(() => {
          if (this.page == 0) {
            this.scrollMessageContainerToBottom();
          } else {

            const container = this.messageContainer.nativeElement;
            const contentHeight = container.scrollHeight;
            this.messageContainer.nativeElement.scrollTo(0, contentHeight - this.scrollPosition - 100);

          }
          this.loading = false;
        });

      }, 0);
    });

  }

  getRooms() {
    if (this.thisidUser) {
      this.loading = true;
      this.messageService.getLastMsgByChat2(this.thisidUser).subscribe(m => {
        this.LastMessageEachChat = m;
        this.loading = false;
      });
    }
    this.chatsListActive = true;
  }

  sendMessage() {

    //add date to msg
    this.msg.dateTime = new Date();
    this.msg.sender = this.thisidUser;
    this.msg.receiver = this.idprovider;

    //update idchat(canal)   
    if (this.activeChat !== -1) {
      this.msg.idchat = this.activeChat!;
    }

    //send to server
    // console.log("enviando: " + this.msg)
    this.websocketService._send(this.msg);

    //show in msgbox
    const newMsg = { ...this.msg };


    this.addNewMessageToMap(newMsg);
    this.setDateOrder();

    this.msg.content = "";
    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

  }

  addNewMessageToMap(msg: Message) {
    const dateKey = new Date(msg.dateTime).toDateString();
    if (this.chatGroups2.has(dateKey)) {
      this.chatGroups2.get(dateKey)?.push(msg);
    } else {
      this.chatGroups2.set(dateKey, [msg]);
      this.setDateOrder();
    }
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
      this.messageService.getLastMsgByChat2(this.thisidUser).subscribe(m => {
        this.LastMessageEachChat = m;
        this.sortByDateDesc();
      });
    }
    this.activeChat = undefined;
    this.chatsListActive = true;
  }

  minimizeMsgBox() {
    this.minimized = !this.minimized;
  }

  playNotificationSound() {
    const audio = new Audio('assets/sound/notification-mouth.wav');
    audio.play();
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

  // sortByDateMsgDesc() {
  //   console.log("ordenando")
  //   console.log(this.chatMessages);
  //   this.chatMessages.sort((b, a) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  // }

  incomingMessage(msg: Message) {

    //is msgbox open
    if (this.activeChat) {

      //is local_idchat == newmsg_idchat
      if (this.activeChat == msg.idchat) {
        //show in msgbox        
        this.addNewMessageToMap(msg);

        //is idsender == chatingwith
      } else if (this.activeChat == -1) {
        //update activechat
        this.activeChat = msg.idchat;

      }

    } else {
      //is listchatbox open      
      if (this.chatsListActive) {
        //show in listchat        
        //const index = this.LastMessageEachChat.findIndex(obj => obj.idchat == msg.idchat);
        //   msg.seen= false;        
        //index !== -1 ? this.LastMessageEachChat[index] = msg : this.LastMessageEachChat.push(msg);
        //   //this.sortByDateDesc();
        this.getRooms();
      }

    }

    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

  }

  suscribeAchat() {

    this.websocketService.msgState$.subscribe((a) => {
      this.incomingMessage(a.x);
      // if (a.x.idChat == 0) {
      //   this.activeChat = a.x.idChat;
      // }

      // this.chatMessages.push(a.x);

      // const index = this.LastMessageEachChat.findIndex(obj => obj.idChat == a.x.idChat);
      // index !== -1 ? this.LastMessageEachChat[index] = a.x : this.LastMessageEachChat.push(a.x);

      // this.playNotificationSound();
      // setTimeout(() => {
      //   this.scrollMessageContainerToBottom();
      // }, 0);

    });
  }


  groupChatsByDate(messages: Message[]) {

    messages.sort((b, a) => b.id - a.id);

    for (let index = 0; index < messages.length; index++) {

      const dateKey = new Date(messages[index].dateTime).toDateString();
      this.chatGroups2.clear(); 
      if (this.chatGroups2.has(dateKey)) {
        this.chatGroups2.get(dateKey)?.push(messages[index]);
      } else {
        this.chatGroups2.set(dateKey, [messages[index]]);
      }
    }
    this.setDateOrder();

  }

  setDateOrder() {
    this.dateOrder = Array.from(this.chatGroups2.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }


  onScroll() {
    const container = this.messageContainer.nativeElement;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.offsetHeight;
    const contentHeight = container.scrollHeight;

    if (scrollPosition === 0 && !this.loading && contentHeight > containerHeight) {
      this.page++;
      this.scrollPosition = contentHeight;
      this.getChats(this.activeChat!);
    }
  }


}
