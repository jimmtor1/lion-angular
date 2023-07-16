import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tender, TenderType } from 'src/app/models/tender';
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
  role: number;
  authorized: boolean;
  // type_list: string[] = ['Građevina', 'Tekstil', 'Vozni park', 'Tehnologija']
  mandatory:boolean;
  saving=false;

  constructor(private tenderService: TenderService, private sellerService: SellerService, private router: Router, private modalService: ModalService) {
    
  }

  ngOnInit(): void {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      if (JSON.parse(usuarioString) > 0) {

        this.iduser = JSON.parse(usuarioString);
        const rol = localStorage.getItem("role");
        if (rol) {
          this.role = JSON.parse(rol);

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
    if (this.tender.projectName !== undefined && this.tender.dateFrom !== undefined && this.tender.dateTo !== undefined && this.tender.description !== undefined && this.tender.tenderTypeList !== undefined) {
      this.saving = true;
      const formData = new FormData();

      if (this.file) {
        formData.append('file', this.file);
      }

      formData.append('iduser', this.iduser.toString());
      formData.append('projectName', this.tender.projectName);
      formData.append('dateFrom', this.tender.dateFrom);
      formData.append('dateTo', this.tender.dateTo);
      formData.append('description', this.tender.description); 
      formData.append('idtypes', this.tender.tenderTypeList.toString());

      //  let tendertype:TenderType[]=[];
      // for (let index = 0; index < this.tender.tenderTypeList.length; index++) {
      //   tenderTypeList.push(new tenderTypeList(this.tender.tenderTypeList)) this.tender.tenderTypeList[index];
        
      // }
      // tendertype.push(new TenderType(1))
      // formData.append('tenderTypeList',   JSON.stringify(tendertype));

      this.tenderService.save(formData).subscribe(dato => {
        this.modalService.openModal("Uspješno ste dodali tender. U najkraćem roku očekujte ponude i izaberite najbolju za vas.", "success");
        if (this.role == 2) {
          this.router.navigate(['panelseller/tenders']);
        } else {
          this.router.navigate(['paneluser/tenders']);
        }        
      }, error => console.log(error));

    }else{
      this.mandatory=true;
    }

  }

  onFileSelected(event: any) {

    const files: FileList = event.target.files;

    const reader = new FileReader();
    this.file = files[0];

  }

  

}
