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

  constructor() { }

  openModal(message: string, type: string) {
    this.modalStateSubject.next({ isOpen: true, message, type});
  }

  closeModal() {
    this.modalStateSubject.next({ isOpen: false });
  }

  openChat(id: number) {
    this.chatStateSubject.next({ iduser: id});
  }

 

}
