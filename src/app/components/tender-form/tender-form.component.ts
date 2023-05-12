import { Component } from '@angular/core';
import { Tender } from 'src/app/models/tender';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'tender-form',
  templateUrl: './tender-form.component.html',
  styleUrls: ['./tender-form.component.css']
})
export class TenderFormComponent {

  iduser: number;
  tender: Tender

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {

      if (JSON.parse(usuarioString) > 0) {
        this.iduser = JSON.parse(usuarioString);
      }

    }
  }

  submit() {

    this.save();
    // if (this.product.idproduct > 0) {
    //   this.edit();
    // } else {
    //   this.save();
    // }

  }

  save() {

    this.tenderService.save(this.tender).subscribe(dato => {
      //this.router.navigate(['sellerpanel']);
      location.reload();
    }, error => console.log(error));
  }

  onFileSelected(event: any) {

  //   const files: FileList = event.target.files;
  //   let im: imgclasification;
  //   for (let i = 0; i < files.length; i++) {
     
  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[i]);

  //     reader.onload = (e: any) => {
  //       im = new imgclasification();
  //       im.isNew = true;
  //       im.link = e.target.result;
  //       im.id = "newimg" + this.idimgnew++;
  //       im.file = files[i];
  //       this.images.push(im);
  //     };

  //   }
  // }

}
