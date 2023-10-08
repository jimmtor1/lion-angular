import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { ChatListComponent } from "./components/chat-list/chat-list.component";
import { MsgListComponent } from "./components/msg-list/msg-list.component";

const routes: Routes = [
  {path:'',component:ChatComponent, children: [
    {path:'',redirectTo: 'chats', pathMatch:'full'},
    {path:'chats', component: ChatListComponent},
    {path:'msg/:idchat/:idprov', component: MsgListComponent},
    {path:'sendmsg/:idprov', component: MsgListComponent}
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class chatRoutingModule { }