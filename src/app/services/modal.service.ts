import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private modalStateSubject = new Subject<any>();
  modalState$ = this.modalStateSubject.asObservable();

  private chatStateSubject = new Subject<any>();
  chatState$ = this.chatStateSubject.asObservable();

  ChatOpened:boolean = false;

  idproduct:number = 0;

  constructor() { }

  openModal(message: string, type: string) {
    this.modalStateSubject.next({ isOpen: true, message, type});
  }

  closeModal() {
    this.modalStateSubject.next({ isOpen: false });
  }

  openChat(id: number) {    
    this.chatStateSubject.next({ iduser: id});
    if(id==0){
      this.ChatOpened = false;    
    }else{
      this.ChatOpened = true;
    }
    
  }

  openChatAndSend(iduser: number, idproduct:number) { 

    this.chatStateSubject.next({iduser: iduser});    
    this.ChatOpened = true;
    this.idproduct = idproduct;
    
  }

  setOpened(){
    
  }

  isChatOpened():boolean{
    return this.ChatOpened;
  }


}
