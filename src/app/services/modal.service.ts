import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private modalStateSubject = new Subject<any>();
  modalState$ = this.modalStateSubject.asObservable();

  constructor() { }

  openModal(message: string) {
    this.modalStateSubject.next({ isOpen: true, message });
  }

  closeModal() {
    this.modalStateSubject.next({ isOpen: false });
  }

}
