import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Message } from '../models/message';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  // webSocketEndPoint: string = 'http://localhost:8080/chat';
  private webSocketEndPoint = `${API_URL}chat`
  topic: string = "/topic/";
  stompClient?: any;
  userToSuscribe: number;

 

  private msgSubject = new Subject<any>();
  msgState$ = this.msgSubject.asObservable();

  _connect() {

    //console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);

    this.stompClient = Stomp.over(ws);

    // Agrega los encabezados de autenticación
    // const authToken = localStorage.getItem('token'); // Coloca aquí tu token de autenticación
    // console.log("token: " + authToken)
    // const headers = {
    //   Authorization: 'Bearer ' + authToken,
    // };   

    //@ts-ignore
    this.stompClient.connect({}, (frame) => {
      //console.log("connected");
      this._suscribe_lastmessage();
    }, this.errorCallBack);



    // const _this = this;
    // //@ts-ignore
    // _this.stompClient.connect({}, (frame) => {
    //   console.log(frame);
    //   //@ts-ignore      
    //   _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
    //     _this.onMessageReceived(sdkEvent);
    //   });
    //   //_this.stompClient.reconnect_delay = 2000;
    // }, this.errorCallBack);
  };

  _suscribe_lastmessage() {
    //@ts-ignore
    this.stompClient.subscribe(this.topic + 'general/' + this.userToSuscribe, (sdkEvent) => {
      this.onMessageReceived(sdkEvent);
    });
  }

  // _suscribe_chat(idchat: number) {
  //   //@ts-ignore
  //   this.stompClient.subscribe(this.topic+idchat, (sdkEvent) => {
  //     this.onMessageReceived(sdkEvent);
  //   });
  // }

  // _suscribe_general(iduser: number) {
  //   //@ts-ignore
  //   this.stompClient.subscribe(this.topic+"general/"+iduser, (sdkEvent) => {
  //     this.onMessageReceived(sdkEvent);
  //   });
  // }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient?.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  //@ts-ignore
  // errorCallBack(error) {
  //   console.log("errorCallBack -> " + error)
  //   setTimeout(() => {
  //     this._connect();
  //   }, 5000);
  // }

  errorCallBack = (error) => {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
  * Send message to sever via web socket
  * @param {*} message 
  */
  //@ts-ignore
  _send(message) {
    //console.log("calling logout api via web socket");
    this.stompClient?.send("/app/hello/" + message.idChat, {}, JSON.stringify(message));
  }
  //@ts-ignore
  onMessageReceived(message) {
    //console.log("Message Recieved from Server :: " + message);
    //@ts-ignore
    let x: Message = JSON.parse(message.body);

    this.msgSubject.next({ x });
    //this.appComponent.handleMessage(JSON.stringify(message.body));
  }



}
