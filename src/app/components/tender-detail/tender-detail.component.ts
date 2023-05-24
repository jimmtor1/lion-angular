import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tender } from 'src/app/models/tender';
import { TenderProposal } from 'src/app/models/tender-proposal';
import { Userr } from 'src/app/models/userr';
import { DOC_URL, select_city, select_fed } from 'src/app/services/helper';
import { TenderService } from 'src/app/services/tender.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit {

  tender: Tender;
  user: Userr;
  id_current_user: number;
  id_current_role: number;
  tenderProposal: TenderProposal[];
  comment: string;
  @Input() idtender: number;
  already_offered: boolean = false;

  url_doc = `${DOC_URL}`;

  fed: string;
  city: string;

  constructor(private tenderService: TenderService, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    const user = localStorage.getItem('iduser');
    if (user) {
      this.id_current_user = JSON.parse(user);
    }

    this.route.params.subscribe(param => {
      if (param['idtender']) {
        this.tenderService.getById(param['idtender']).subscribe(t => {
          this.tender = t;

          this.userService.getById(this.tender.iduser).subscribe(u => {
            this.user = u;
            let x = select_fed(this.user.federation);
            if(x){
              this.fed = x.name;
            }            
            this.city = select_city(this.user.city).name;
          });

          const role = localStorage.getItem('role');
          if (role) {
            this.id_current_role = JSON.parse(role);
            if (this.id_current_role !== 3) {
              this.get_already_offer();
            }
          }

        });
      } else {

        this.tenderService.getById(this.idtender).subscribe(t => {
          this.tender = t;

          this.userService.getById(this.tender.iduser).subscribe(u => {
            this.user = u;
            let x = select_fed(this.user.federation);
            if(x){
              this.fed = x.name;
            }            
            this.city = select_city(this.user.city).name;
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

    formData.append('idTender', this.tender.idtender.toString());
    formData.append('user', this.id_current_user.toString());
    formData.append('comment', this.comment);

    this.tenderService.saveProposal(formData).subscribe(x => {
      if (x.idProposal > 0) {
        this.already_offered = true;
      } else {
        alert("no se guardó")
      }
    })
  }


  // federations: string[] = [
  //   // "FEDERACIJA BiH",
  //   "UNSKO-SANSKI KANTON",
  //   "Posavski kanton",
  //   "Tuzlanski kanton",
  //   "Zeničko-dobojski kanton",
  //   "Bosansko-podrinjski kanton",
  //   "Srednjobosanski kanton",
  //   "Hercegovačko-neretvanski kanton",
  //   "Zapadnohercegovački kanton",
  //   "Kanton Sarajevo",
  //   "Kanton 10",
  //   // "REPUBLIKA SRPSKA",
  //   "Banjalučka",
  //   "Dobojsko-Bijeljinska",
  //   "Sarajevsko-Zvornička",
  //   "Trebinjsko-Fočanska",
  //   // "BRČKO DISTRIKT"
  // ];

  // cities: string[][] = [
  //   ["Bihać", "Bosanska Krupa", "Bosanski Petrovac", "Bužim", "Cazin", "Ključ", "Sanski Most", "Velika Kladuša"],
  //   ["Šamac", "Odžak", "Orašje"],
  //   ["Banovići", "Čelić", "Doboj Istok", "Gračanica", "Gradačac", "Kalesija", "Kladanj", "Lukavac", "Sapna", "Srebrenik", "Teočak", "Tuzla", "Živinice"],
  //   ["Breza", "Doboj Jug", "Kakanj", "Maglaj", "Olovo", "Tešanj", "Usora", "Vareš", "Visoko", "Zavidovići", "Zenica", "Žepče"],
  //   ["Goražde", "Ustikolina"],
  //   ["Bugojno", "Busovača", "Dobretići", "Donji Vakuf", "Fojnica", "Gornji Vakuf-Uskoplje", "Jajce", "Kiseljak", "Kreševo", "Novi Travnik", "Travnik", "Vitez"],
  //   ["Čapljina", "Čitluk", "Jablanica", "Konjic", "Mostar", "Neum", "Prozor", "Ravno", "Stolac"],
  //   ["Grude", "Ljubuški", "Posušje", "Široki Brijeg"],
  //   ["Hadžići", "Ilidža", "Ilijaš", "Sarajevo - Centar", "Sarajevo - Novi Grad", "Sarajevo - Novo Sarajevo", "Sarajevo - Stari Grad", "Trnovo", "Vogošća"],
  //   ["Bosansko Grahovo", "Drvar", "Glamoč", "Kupres", "Livno", "Tomislavgrad"],
  //   //   ["Banjalučka", "Dobojsko-Bijeljinska", "Sarajevsko-Zvornička", "Trebinjsko-Fočanska"],
  //   ["Kozarska Dubica", "Krupa na Uni", "Laktaši", "Mrkonjić Grad", "Novi Grad", "Oštra Luka", "Prijedor", "Prnjavor", "Ribnik", "Šipovo", "Srbac"],
  //   ["Lopare", "Modriča", "Pelagićevo", "Petrovo", "Šamac", "Stanari", "Teslić", "Ugljevik", "Vukosavlje"],
  //   ["Novo Goražde", "Osmaci", "Pale", "Rogatica", "Rudo", "Šekovići", "Sokolac", "Srebrenica", "Višegrad", "Vlasenica", "Zvornik"],
  //   ["Bileća", "Čajniče", "Foča", "Gacko", "Istočni Mostar", "Kalinovik", "Ljubinje", "Nevesinje", "Trebinje"],
  //   ["Brčko"]
  // ]


}
