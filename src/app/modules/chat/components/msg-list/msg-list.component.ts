import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
// import { FunctionsService } from 'src/app/util/functions.service';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})
export class MsgListComponent implements OnInit, AfterViewChecked {

  MsgList: Message[] = [];
  thisidUser = parseInt(localStorage.getItem('iduser')!);

  msg: Message = new Message();
  chatingWhit = "";
  chatingWhiid = 0;
  @ViewChild('messageContainer') messageContainer: ElementRef;
  page = 0;
  isLoading = false;
  isSuscribed = false;
  scrollPosition = 0;
  fechamsgshowed: Date;

  chatGroups: any[] = [];

  chatGroups2: Map<string, Message[]> = new Map();
  dateOrder: string[];

  constructor(private route: ActivatedRoute, private msgService: MessageService, private websocketService: ChatSocketService, private userService: UserService, private modalService: ModalService) { }

  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['idchat']) {

        this.getChats(params['idchat']);       
        this.getChatingWith(params['idprov']);

      } else if (params['idprov']) {


        this.msgService.getMessagesWith(this.thisidUser, params['idprov']).subscribe(chat => {

          if (chat) {
            this.getChats(chat.id);
          } else {
            this.getChatingWith(params['idprov']);
            this.msg.idchat = 0;
            this.msg.sender = this.thisidUser;
            this.suscribeAchat();
            this.modalService.openChat
          }
        });

      }

    })

  }

  getChatingWith(idprov: number) {
   
    this.userService.getById(idprov).subscribe(u => {
      
      // this.msg.receiver = u.id;
      this.chatingWhit = u.firstName + " " + u.lastName;
      this.chatingWhiid = u.id;

    });
    //this.activeChat = -1;

  }

  getChats(idchat: number) {
    this.isLoading = true;

    this.msg.idchat = idchat;
    this.thisidUser = localStorage.getItem('iduser') ? parseInt(localStorage.getItem('iduser')!) : 0;

    this.msgService.getMessagesByChat(idchat, this.thisidUser, this.page).subscribe(m => {
      
      let messages: Message[] = m.content;
      this.groupChatsByDate(messages);

      setTimeout(() => {
        if (this.page == 0) {
          this.scrollMessageContainerToBottom();
        } else {

          const container = this.messageContainer.nativeElement;
          const contentHeight = container.scrollHeight;
          this.messageContainer.nativeElement.scrollTo(0, contentHeight - this.scrollPosition);

        }
        this.isLoading = false;
      });


      if (!this.isSuscribed) {
        this.suscribeAchat();
      }
      this.isLoading = false;

    }, error => (this.isLoading = false));
  }

  sendMessage() {

    //add date to msg
    this.msg.dateTime = new Date();
    this.msg.sender = this.thisidUser;
    this.msg.receiver = this.chatingWhiid;

    //send to server
    this.websocketService._send(this.msg);

    //show in msgbox
    const newMsg = { ...this.msg };

    this.addNewMessageToMap(newMsg);
    this.setDateOrder();

    // const long = this.chatGroups.length;
    // if (FunctionsService.isSameDate(this.msg.dateTime, new Date(this.chatGroups[long - 1].date))) {
    //   this.chatGroups[long - 1].chats.push(newMsg);
    // } else {
    //   this.chatGroups.push(new Date(newMsg.dateTime).toDateString(), { date: newMsg.dateTime, chats: [newMsg] });
    // }

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

  scrollMessageContainerToBottom() {
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  suscribeAchat() {

    this.websocketService.msgState$.subscribe((a) => {
      this.incomingMessage(a.x);
      this.isSuscribed = true;
    });

  }

  incomingMessage(msg: Message) {

    if (this.MsgList) {
      //show in listchat        
      this.MsgList.push(msg);
    }

    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

  }

  onScroll() {
    const container = this.messageContainer.nativeElement;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.offsetHeight;
    const contentHeight = container.scrollHeight;

    if (scrollPosition === 0 && !this.isLoading && contentHeight > containerHeight) {
      this.page++;
      this.scrollPosition = contentHeight;
      this.getChats(this.msg.idchat);
    }
  }

  setDateMsg(date: Date) {
    this.fechamsgshowed = date;
  }

  // groupChatsByDate() {
  //   this.MsgList.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  //   const groupsMap = this.MsgList.reduce((map, chat) => {
  //     const dateKey = new Date(chat.dateTime).toDateString();
  //     if (map.has(dateKey)) {
  //       map.get(dateKey).chats.push(chat);
  //     } else {
  //       map.set(dateKey, { date: chat.dateTime, chats: [chat] });
  //     }
  //     return map;
  //   }, new Map());
  //   // .sort((a, b) => a.date - b.date)    
  //   this.chatGroups = Array.from(groupsMap.values());
  //   // .reverse()
  //   //this.chatGroups = sortedGroups;

  // }

  groupChatsByDate(messages: Message[]) {

    messages.sort((b, a) => b.id - a.id);

    for (let index = 0; index < messages.length; index++) {

      const dateKey = new Date(messages[index].dateTime).toDateString();
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


}
