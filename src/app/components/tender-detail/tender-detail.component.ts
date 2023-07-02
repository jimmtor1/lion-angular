import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tender } from 'src/app/models/tender';
import { TenderProposal } from 'src/app/models/tender-proposal';
import { Userr } from 'src/app/models/userr';
import { DOC_PROPOSAL_URL, DOC_URL, select_city, select_fed } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { TenderService } from 'src/app/services/tender.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit {

  tender: Tender = new Tender();
  user: Userr;
  id_current_user: number;
  id_current_role: number;
  tenderProposal: TenderProposal[] = [];
  comment: string;
  @Input() idtender: number;
  already_offered: boolean = false;
  canOffer: boolean = false;
  loading = true;
  file: File;
  type_list:string[]=['Građevina','Tekstil','Vozni park','Tehnologija']

  url_doc = `${DOC_URL}`;
  url_proposal_doc = `${DOC_PROPOSAL_URL}`;


  fed: string;
  city: string;

  constructor(private tenderService: TenderService, private route: ActivatedRoute, private userService: UserService, private modelChat: ModalService) { }
 
  ngOnInit(): void {

    const user = localStorage.getItem('iduser');
    if (user) {
      this.id_current_user = JSON.parse(user);
    }

    this.route.params.subscribe(param => {
      if (param['idtender']) {
        this.tenderService.getById(param['idtender']).subscribe(t => {
          this.tender = t;
         
          const role = localStorage.getItem('role');
          if (role) {
            this.id_current_role = JSON.parse(role);
            if (this.id_current_role == 2 && this.id_current_user != this.tender.iduser) {
              this.get_already_offer();
              this.canOffer = true;
            } else if ((this.id_current_role !== 3 && this.id_current_user == this.tender.iduser) || this.id_current_role == 3) {
              this.getProposals();
              this.canOffer = false;
            }

          }

          this.userService.getById(this.tender.iduser).subscribe(u => {
            this.user = u;
            let x = select_fed(this.user.federation);
            if (x) {
              this.fed = x.name;
            }
            this.city = select_city(this.user.city).name;
            this.loading = false;
          });
        });
      } else {

        this.tenderService.getById(this.idtender).subscribe(t => {
          this.tender = t;

          this.userService.getById(this.tender.iduser).subscribe(u => {
            this.user = u;
            let x = select_fed(this.user.federation);
            if (x) {
              this.fed = x.name;
            }
            this.city = select_city(this.user.city).name;
            this.loading = false;
          });

          const role = localStorage.getItem('role');
          if (role) {
            this.id_current_role = JSON.parse(role);
            if (this.id_current_role !== 3) {
              this.get_already_offer();
            }
          }

        });

      }
    })



  }

  get_already_offer() {

    this.tenderService.confirmAlreadyPosted(this.tender.idtender, this.id_current_user).subscribe(t => {
      if (t) {
        this.already_offered = true;
        this.canOffer = false;
        this.tenderProposal.push(t);
      } else {
        this.already_offered = false;
      }

    });

  }

  getProposals() {

    this.tenderService.getProposalList(this.tender.idtender).subscribe(t => {     
      this.tenderProposal = t;
    });

  }

  saveProposal() {

    const formData = new FormData();

    formData.append('file', this.file);
    formData.append('idTender', this.tender.idtender.toString());
    formData.append('user', this.id_current_user.toString());
    formData.append('comment', this.comment);

    this.tenderService.saveProposal(formData).subscribe(x => {
      if (x.idProposal > 0) {
        this.already_offered = true;
        this.canOffer = false;
        this.tenderProposal.push(x);
      } else {
        alert("no se guardó")
      }
    })
  }

  onFileSelected(event: any) {

    const files: FileList = event.target.files;

    const reader = new FileReader();
    this.file = files[0];

  }

  emitSeller(idseller: number) {
    console.log("idseller: " + idseller);
    this.modelChat.openChat(idseller);    
  }


}
