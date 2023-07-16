import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MsgListComponent } from './components/msg-list/msg-list.component';
import { chatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    MsgListComponent    
  ],
  imports: [
    CommonModule,
    chatRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class ChatModule {
  
 }
