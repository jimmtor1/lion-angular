import { Component } from '@angular/core';
// import { Seller } from 'src/app/models/seller';
import { Tender } from 'src/app/models/tender';
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
  loading:boolean = true;
  // role:number=0;
  authorized:boolean;

  constructor(private tenderService: TenderService, private sellerService: SellerService) { }

  ngOnInit(): void {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      if (JSON.parse(usuarioString) > 0) {
      
        this.iduser = JSON.parse(usuarioString);
        const rol = localStorage.getItem("role");
        if(rol){
          // this.role=JSON.parse(rol);
     
          if (JSON.parse(rol) == 2) {
            // this.sellerService.getById(this.iduser).subscribe(s => {
            //   this.seller = s;
            //   this.loading=false;
            // });

            this.sellerService.isActive(this.iduser).subscribe(s => {
              this.authorized = s;
              this.loading=false;
            });
          }else{
            this.authorized = true;
            this.loading=false;
          }
        }else{
          this.loading=false;
        }      

      }

    }

  }

  submit() {
    this.save();
  }

  save() {
    console.log(this.tender);
    const formData = new FormData();

    formData.append('file', this.file);

    formData.append('iduser', this.iduser.toString());
    formData.append('projectName', this.tender.projectName);
    formData.append('dateFrom', this.tender.dateFrom);
    formData.append('dateTo', this.tender.dateTo);
    formData.append('description', this.tender.description);

    this.tenderService.save(formData).subscribe(dato => {
      //this.router.navigate(['sellerpanel']);
      location.reload();
    }, error => console.log(error));

  }

  onFileSelected(event: any) {

    const files: FileList = event.target.files;

    const reader = new FileReader();
    this.file = files[0];

  }

}
