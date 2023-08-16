import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
import { IMG_BANNER_URL } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  urlbanner_img = `${IMG_BANNER_URL}`;
  files: File[] = [];
  imageSrc: any[] = [];
  banner:Banner[]=[];
  loading=false;
  
  constructor(private settingService: SettingService, private modalService: ModalService, private banerService: BannerService) { }
  
  ngOnInit(): void {
    this.loading = true;
    this.banerService.getAll().subscribe(b=>{
      this.banner = b;
      this.loading = false;
    },(error)=>{this.loading=false})
  }


  onFileSelected(event: any, imageNum: number) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.files[imageNum] = inputElement.files[0];
      this.displayImage(this.files[imageNum], imageNum);
    }

  }

  displayImage(file: File, imageNum: number): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageSrc[imageNum] = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  save(imageNum: number) {
    console.log(this.files[imageNum]);

    if (this.files[imageNum]) {

      const formData = new FormData();

      formData.append('file', this.files[imageNum]);
      formData.append('imageNum', imageNum.toString());
      formData.append('id',  this.banner[imageNum].id.toString());
      formData.append('imageName',  this.banner[imageNum].imageName);
      formData.append('link',  this.banner[imageNum].link);

  
      this.settingService.saveImage(formData).subscribe(b => {

        if (b) {
          this.modalService.openModal("image uploaded successfully", "1");
        }
      }, error => { console.log(error) });

    } else {
      alert("Niste odabrali nijednu sliku");
    }

  }

}
