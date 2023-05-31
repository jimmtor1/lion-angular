import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tender } from 'src/app/models/tender';
import { ModalService } from 'src/app/services/modal.service';
import { SellerService } from 'src/app/services/seller.service';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender-form',
  templateUrl: './tender-form.component.html',
  styleUrls: ['./tender-form.component.css']
})
export class TenderFormComponent {

  iduser: number;
  tender: Tender = new Tender();
  file: File;
  // seller:Seller;
  loading: boolean = true;
  role:number;
  authorized: boolean;

  constructor(private tenderService: TenderService, private sellerService: SellerService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      if (JSON.parse(usuarioString) > 0) {

        this.iduser = JSON.parse(usuarioString);
        const rol = localStorage.getItem("role");
        if (rol) {
          this.role=JSON.parse(rol);

          if (JSON.parse(rol) == 2) {
            // this.sellerService.getById(this.iduser).subscribe(s => {
            //   this.seller = s;
            //   this.loading=false;
            // });

            this.sellerService.isActive(this.iduser).subscribe(s => {
              this.authorized = s;
              this.loading = false;
            });
          } else {
            this.authorized = true;
            this.loading = false;
          }
        } else {
          this.loading = false;
        }

      }

    }

  }

  submit() {
    this.save();
  }

  save() {

    const formData = new FormData();
    
    formData.append('iduser', this.iduser.toString());
    formData.append('projectName', this.tender.projectName);
    formData.append('dateFrom', this.tender.dateFrom);
    formData.append('dateTo', this.tender.dateTo);
    formData.append('description', this.tender.description);

    this.tenderService.save(formData).subscribe(dato => {
      this.modalService.openModal("Uspješno ste dodali tender. U najkraćem roku očekujte ponude i izaberite najbolju za vas.", "success");
      if(this.role==2){
        this.router.navigate(['panelseller/tenders']);
      }else{
        this.router.navigate(['paneluser/tenders']);
      }
      
    }, error => console.log(error));

  }

  onFileSelected(event: any) {

    const files: FileList = event.target.files;

    const reader = new FileReader();
    this.file = files[0];

  }

}
