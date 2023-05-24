import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'modal-ms',
  templateUrl: './modal-ms.component.html',
  styleUrls: ['./modal-ms.component.css']
})
export class ModalMsComponent {

  @Input() message: string;

  constructor(private modalService:ModalService){}

  closeModal(){
    this.modalService.closeModal();
  }

}
