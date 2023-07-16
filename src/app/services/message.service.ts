import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './helper';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private URL = `${API_URL}`;

  ChatList: Message[] = [];
  MsgList: Message[] = [];
  private static ChatList: Message[];
  private static MsgList: Message[];

  constructor(private http:HttpClient) { }

  getLastMsgByChat(iduser:number):Observable<Message[]>{
    return this.http.get<Message[]>(`${this.URL}chats/${iduser}`);
  };

  getMessagesByChat(idchat:number, page:number):Observable<Message[]>{
    return this.http.get<Message[]>(`${this.URL}chats/messages/${idchat}/${page}`);
  }

  getMessagesWith(iduser1:number,iduser2:number):Observable<Chat>{
    return this.http.get<Chat>(`${this.URL}chats/exist/${iduser1}/${iduser2}`);
  }

  static getChatList(): Message[] {
    return this.ChatList;
  }

  static setChatList(msg:Message[]): void{
    this.ChatList = msg;
  }

  static getMsgList(): Message[] {
    return this.MsgList;
  }

  

}
