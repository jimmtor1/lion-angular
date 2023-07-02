import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { select_fed, selectListByFed, select_city, IMG_PROFILE_URL, federation, FEDERATIONS } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  iduser: number;
  seller: Seller;
  image: string;
  urlprof_img = `${IMG_PROFILE_URL}`;
  fed: federation;
  city: number;
  citiesToCombo: any[] = [];
  subcategoriesSelected: Subcategory[] = [];
  editmode: boolean = false;
  subcategories: Subcategory[] = [];
  imageSelected = false;
  imageFile: File;
  federations: federation[] = FEDERATIONS;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private sellerService: SellerService, private categoryService: CategoryService, private modalService: ModalService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(param => {
      if (param['iduser']) {
        this.iduser = param['iduser'];
        this.getSeller();        
      }
    });

    
  }

  getSeller() {

    this.sellerService.getById(this.iduser).subscribe(sellerBd => {
      this.seller = sellerBd;
      this.image = this.urlprof_img + this.seller.image;

      if (this.seller.user.federation) {
        let x = select_fed(this.seller.user.federation);
        if (x) {
          this.fed = x;
        }

        if (this.fed) {
          this.citiesToCombo = selectListByFed(this.fed.id);
        }

      }

      if (this.seller.user.city) {
        this.city = select_city(this.seller.user.city).id;
      }

      this.subcategoriesSelected = [];
      this.seller.providerSubcategoryList.forEach(p => {
        this.subcategoriesSelected.push(p.subcategory);
      })

    });
  }

  activeEdit() {
    this.editmode = !this.editmode;

    if (this.editmode) {
      this.subcategoriesCombo();
    } else {
      this.subcategories = [];
      this.seller.providerSubcategoryList.forEach(p => {
        this.subcategories.push(p.subcategory);
      })
    }


  }

  subcategoriesCombo() {
    this.categoryService.getAllsub().subscribe(subcategories => {
      this.subcategories = subcategories;

      let sub: Subcategory = new Subcategory();
      sub.category = 1;
      sub.subcategoryName = "Građevinarstvo";
      let sub2: Subcategory = new Subcategory();
      sub2.category = 2;
      sub2.subcategoryName = "Sve za kuću";
      let sub3: Subcategory = new Subcategory();
      sub3.category = 3;
      sub3.subcategoryName = "Informatika i telekomunikacije";
      let sub4: Subcategory = new Subcategory();
      sub4.category = 4;
      sub4.subcategoryName = "Od glave do pete";

      this.subcategories.splice(0, 0, sub);
      this.subcategories.splice(21, 0, sub2);
      this.subcategories.splice(48, 0, sub3);
      this.subcategories.splice(59, 0, sub4);

    });
  }

  save() {

    const formData = new FormData();
    this.subcategoriesSelected.forEach(sub => {
      formData.append('idsubcategories', sub.idsubcategory.toString())
    })

    if (this.imageSelected) {
      formData.append('file', this.imageFile);
    }

    formData.append('idprovider', this.seller.idprovider.toString());
    formData.append('companyName', this.seller.companyName);
    formData.append('address', this.seller.user.address);
    formData.append('street', this.seller.street);
    formData.append('postalCode', this.seller.postalCode);
    formData.append('annualLeave', this.seller.annualLeave);
    formData.append('deliveryCost', this.seller.deliveryCost);
    formData.append('image', this.seller.image);
    formData.append('biography', this.seller.biography);
    formData.append('identification', this.seller.identification);

    if (this.seller.accepted !== null) {
      formData.append('accepted', this.seller.accepted.toString());
    }

    formData.append('monday', this.seller.monday.toString());
    formData.append('tuesday', this.seller.tuesday.toString());
    formData.append('wednesday', this.seller.wednesday.toString());
    formData.append('thursday', this.seller.thursday.toString());
    formData.append('friday', this.seller.friday.toString());
    formData.append('saturday', this.seller.saturday.toString());
    formData.append('sunday', this.seller.sunday.toString());

    if(this.seller.timemonday){
      formData.append('timemonday', this.seller.timemonday.toString());
    }
    if(this.seller.timetuesday){
      formData.append('timetuesday', this.seller.timetuesday.toString());
    }
    if(this.seller.timewednesday){
      formData.append('timewednesday', this.seller.timewednesday.toString());
    }
    if(this.seller.timethursday){
      formData.append('timethursday', this.seller.timethursday.toString());
    }
    if(this.seller.timefriday){
      formData.append('timefriday', this.seller.timefriday.toString());
    }
    if(this.seller.timesaturday){
      formData.append('timesaturday', this.seller.timesaturday.toString());
    }
    if(this.seller.timesunday){
      formData.append('timesunday', this.seller.timesunday.toString());
    }
    
    

    if(this.seller.endmonday){
      formData.append('endmonday', this.seller.endmonday.toString());
    }
    if(this.seller.endtuesday){
      formData.append('endtuesday', this.seller.endtuesday.toString());
    }
    if(this.seller.endwednesday){
      formData.append('endwednesday', this.seller.endwednesday.toString());
    }
    if(this.seller.endthursday){
      formData.append('endthursday', this.seller.endthursday.toString());
    }
    if(this.seller.endfriday){
      formData.append('endfriday', this.seller.endfriday.toString());
    }
    if(this.seller.endsaturday){
      formData.append('endsaturday', this.seller.endsaturday.toString());
    }
    if(this.seller.endsunday){
      formData.append('endsunday', this.seller.endsunday.toString());
    }

    // if (this.seller.startTime) {
    //   formData.append('startTime', this.seller.startTime.toString());
    // }

    // if (this.seller.endTime) {
    //   formData.append('endTime', this.seller.endTime.toString());
    // }

    formData.append('facebook', this.seller.facebook);
    formData.append('instagram', this.seller.instagram);
    formData.append('youtube', this.seller.youtube);

    formData.append('id', this.seller.user.id.toString());
    formData.append('email', this.seller.user.email);
    formData.append('firstName', this.seller.user.firstName);
    formData.append('lastName', this.seller.user.lastName);

    if (this.fed) {
      formData.append('federation', this.fed.id.toString());
    } else if (this.seller.user.federation) {
      formData.append('federation', this.seller.user.federation.toString());
    }

    if (this.city) {
      formData.append('city', this.city.toString());
    } else if (this.seller.user.city) {
      formData.append('federation', this.seller.user.city.toString());
    }

    formData.append('phone', this.seller.user.phone);
    formData.append('password', this.seller.user.password);

    let myDate = this.datePipe.transform(this.seller.user.creationDate, 'yyyy-MM-dd HH:mm:ss');

    if (myDate !== null) {
      formData.append('creationDate2', myDate);
    }

    formData.append('idrole', this.seller.user.role.id.toString());

    this.sellerService.save(formData).subscribe(dato => {

      if (dato.idprovider > 0) {
        this.getSeller();
        this.editmode = false;
        this.modalService.openModal("Uspješno ažurirani i sačuvani podaci.", "success");
      } else {
        console.log("no se guardó");
      }
    }, error => console.log(error));
  }

  onFileSelected(event: any) {

    const files: FileList = event.target.files;
    if (files.length > 0) {

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (e: any) => {
        this.image = e.target.result;
        this.imageFile = files[0];
        this.imageSelected = true;
      }

    }

  }

  citiesCombo(event: Event) {
    let fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.seller.user.federation = fed;
    this.citiesToCombo = selectListByFed(fed);
  }

  selectedCity(event: Event) {
    this.city = parseInt((event.target as HTMLSelectElement)?.value);
  }

}
