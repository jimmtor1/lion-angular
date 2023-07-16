import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { Userr } from 'src/app/models/userr';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { FunctionsService } from 'src/app/util/functions.service';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})
export class MsgListComponent implements OnInit, AfterViewChecked {

  MsgList: Message[] = [];
  thisidUser = 0;
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

  constructor(private route: ActivatedRoute, private msgService: MessageService, private websocketService: ChatSocketService, private userService: UserService, private modalService: ModalService) { }

  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['idchat']) {

        this.getChats(params['idchat']);

      } else if (params['idprov']) {

        this.msgService.getMessagesWith(this.thisidUser, params['idprov']).subscribe(chat => {

          if (chat) {
            this.getChats(chat.id);
          } else {

            this.userService.getById(params['idprov']).subscribe(u => {

              this.msg.receiver = u;
              this.chatingWhit = u.firstName + " " + u.lastName;
              this.chatingWhiid = u.id;

            });
            //this.activeChat = -1;
            this.msg.idChat = 0;
            this.msg.sender = new Userr(this.thisidUser);
            this.suscribeAchat();
            this.modalService.openChat
          }
        });

      }

    })

  }

  getChats(idchat: number) {
    this.isLoading = true;

    this.msg.idChat = idchat;
    this.thisidUser = localStorage.getItem('iduser') ? parseInt(localStorage.getItem('iduser')!) : 0;

    this.msgService.getMessagesByChat(idchat, this.page).subscribe(m => {
      // this.MsgList = m.concat(this.MsgList);
      this.MsgList = this.MsgList.concat(m);
      if (this.chatingWhit == "") {
        this.chatingWhit = m[0].receiver.id == this.thisidUser ? m[0].sender.firstName + " " + m[0].sender.lastName : m[0].receiver.firstName + " " + m[0].receiver.lastName;
        this.chatingWhiid = m[0].receiver.id == this.thisidUser ? m[0].sender.id : m[0].receiver.id;
      }

      this.groupChatsByDate();

      if (this.page == 0) {
        setTimeout(() => {
          this.scrollMessageContainerToBottom();
        }, 0);
      } else {
        setTimeout(() => {
          const container = this.messageContainer.nativeElement;
          const contentHeight = container.scrollHeight;
          this.messageContainer.nativeElement.scrollTo(0, contentHeight - this.scrollPosition - 80);
        }, 0);
      }


      if (!this.isSuscribed) {
        this.suscribeAchat();
      }
      this.isLoading = false;

    }, error => (this.isLoading = false));
  }

  sendMessage() {

    //add date to msg
    this.msg.dateTime = new Date();
    this.msg.sender = new Userr(this.thisidUser);
    this.msg.receiver = new Userr(this.chatingWhiid);

    //send to server
    this.websocketService._send(this.msg);

    //show in msgbox
    const newMsg = { ...this.msg };
   
    const long = this.chatGroups.length;
    if (FunctionsService.isSameDate(this.msg.dateTime, new Date(this.chatGroups[long - 1].date))) {
      this.chatGroups[long - 1].chats.push(newMsg);
    } else {
      this.chatGroups.push(new Date(newMsg.dateTime).toDateString(), { date: newMsg.dateTime, chats: [newMsg] });
    }
  
    this.msg.content = "";
    setTimeout(() => {
      this.scrollMessageContainerToBottom();
    }, 0);

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

  onScroll(event: any) {
    const container = this.messageContainer.nativeElement;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.offsetHeight;
    const contentHeight = container.scrollHeight;

    if (scrollPosition === 0 && !this.isLoading && contentHeight > containerHeight) {
      this.page++;
      this.scrollPosition = contentHeight;
      this.getChats(this.msg.idChat);
    }
  }

  setDateMsg(date: Date) {
    this.fechamsgshowed = date;
  }

  groupChatsByDate() {
    this.MsgList.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    const groupsMap = this.MsgList.reduce((map, chat) => {
      const dateKey = new Date(chat.dateTime).toDateString();
      if (map.has(dateKey)) {
        map.get(dateKey).chats.push(chat);
      } else {
        map.set(dateKey, { date: chat.dateTime, chats: [chat] });
      }
      return map;
    }, new Map());
    // .sort((a, b) => a.date - b.date)    
    this.chatGroups = Array.from(groupsMap.values());
    // .reverse()
    //this.chatGroups = sortedGroups;
 
  }


}
