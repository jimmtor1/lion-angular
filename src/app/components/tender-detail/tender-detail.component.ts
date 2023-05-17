import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tender } from 'src/app/models/tender';
import { TenderProposal } from 'src/app/models/tender-proposal';
import { Userr } from 'src/app/models/userr';
import { TenderService } from 'src/app/services/tender.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit {

tender:Tender;
user:Userr;
tenderProposal:TenderProposal[];
@Input() idtender: number;

constructor(private tenderService:TenderService, private route: ActivatedRoute, private userService:UserService){}

 ngOnInit(): void {

  this.route.params.subscribe(param=>{
    if(param['idtender']){
      this.tenderService.getById(param['idtender']).subscribe(t=>{
        this.tender = t;

        this.userService.getById(this.tender.iduser).subscribe(u=>{
          this.user = u;
        });

      }); 
    }else{

      this.tenderService.getById(this.idtender).subscribe(t=>{
        this.tender = t;

        this.userService.getById(this.tender.iduser).subscribe(u=>{
          this.user = u;
        });

      });

    }   
  })
 
}

getProposals(){
  this.tenderService.getProposalList(this.tender.idtender).subscribe(t=>{
    this.tenderProposal = t;
  });
}


federations: string[] = [
  // "FEDERACIJA BiH",
  "UNSKO-SANSKI KANTON",
  "Posavski kanton",
  "Tuzlanski kanton",
  "Zeničko-dobojski kanton",
  "Bosansko-podrinjski kanton",
  "Srednjobosanski kanton",
  "Hercegovačko-neretvanski kanton",
  "Zapadnohercegovački kanton",
  "Kanton Sarajevo",
  "Kanton 10",
  // "REPUBLIKA SRPSKA",
  "Banjalučka",
  "Dobojsko-Bijeljinska",
  "Sarajevsko-Zvornička",
  "Trebinjsko-Fočanska",
  // "BRČKO DISTRIKT"
];

cities: string[][] = [  
  ["Bihać", "Bosanska Krupa", "Bosanski Petrovac", "Bužim", "Cazin", "Ključ", "Sanski Most", "Velika Kladuša"],
  ["Šamac", "Odžak", "Orašje"],
  ["Banovići", "Čelić", "Doboj Istok", "Gračanica", "Gradačac", "Kalesija", "Kladanj", "Lukavac", "Sapna", "Srebrenik", "Teočak", "Tuzla", "Živinice"],
  ["Breza", "Doboj Jug", "Kakanj", "Maglaj", "Olovo", "Tešanj", "Usora", "Vareš", "Visoko", "Zavidovići", "Zenica", "Žepče"],
  ["Goražde", "Ustikolina"],
  ["Bugojno", "Busovača", "Dobretići", "Donji Vakuf", "Fojnica", "Gornji Vakuf-Uskoplje", "Jajce", "Kiseljak", "Kreševo", "Novi Travnik", "Travnik", "Vitez"],
  ["Čapljina", "Čitluk", "Jablanica", "Konjic", "Mostar", "Neum", "Prozor", "Ravno", "Stolac"],
  ["Grude", "Ljubuški", "Posušje", "Široki Brijeg"],
  ["Hadžići", "Ilidža", "Ilijaš", "Sarajevo - Centar", "Sarajevo - Novi Grad", "Sarajevo - Novo Sarajevo", "Sarajevo - Stari Grad", "Trnovo", "Vogošća"],
  ["Bosansko Grahovo", "Drvar", "Glamoč", "Kupres", "Livno", "Tomislavgrad"],
//   ["Banjalučka", "Dobojsko-Bijeljinska", "Sarajevsko-Zvornička", "Trebinjsko-Fočanska"],
  ["Kozarska Dubica", "Krupa na Uni", "Laktaši", "Mrkonjić Grad", "Novi Grad", "Oštra Luka", "Prijedor", "Prnjavor", "Ribnik", "Šipovo", "Srbac"],
  ["Lopare", "Modriča", "Pelagićevo", "Petrovo", "Šamac", "Stanari", "Teslić", "Ugljevik", "Vukosavlje"],
  ["Novo Goražde", "Osmaci", "Pale", "Rogatica", "Rudo", "Šekovići", "Sokolac", "Srebrenica", "Višegrad", "Vlasenica", "Zvornik"],
  ["Bileća", "Čajniče", "Foča", "Gacko", "Istočni Mostar", "Kalinovik", "Ljubinje", "Nevesinje", "Trebinje"],
  ["Brčko"]
]


}
