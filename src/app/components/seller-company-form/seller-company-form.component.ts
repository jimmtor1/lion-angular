import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company_subcategory, Seller } from 'src/app/models/seller';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { FEDERATIONS, IMG_PROFILE_URL, federation, selectListByFed, select_city, select_fed } from 'src/app/services/helper';
import { SellerService } from 'src/app/services/seller.service';



@Component({
  selector: 'seller-company-form',
  templateUrl: './seller-company-form.component.html',
  styleUrls: ['./seller-company-form.component.css']
})
export class SellerCompanyFormComponent implements OnInit {

  seller: Seller = new Seller();
  selectedCategory: number;
  subcategories: Subcategory[];
  iduser: number;
  loading: boolean = true;
  image: string;
  imageFile: File;
  imageSelected = false;
  company_category: Company_subcategory[] = [];
  citiesToCombo: any[] = [];

  federations: federation[] = FEDERATIONS;
  
  fed: federation | null;
  city: number;

  urlprof_img = `${IMG_PROFILE_URL}`;

  // selectedSucategories: Subcategory[] = [];

  constructor(private categoryService: CategoryService, private sellerService: SellerService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSeller();
    this.subcategoriesCombo();
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
      this.loading = false;      
    });

  }

  getSeller() {

    const usuarioString = localStorage.getItem("iduser");
    if (usuarioString) {
      if (JSON.parse(usuarioString) > 0) {
        // this.iduser = JSON.parse(usuarioString); 
        this.sellerService.getById(JSON.parse(usuarioString)).subscribe(sellerBd => {
          this.seller = sellerBd;
          
          this.fed = select_fed(this.seller.user.federation);
          this.city = select_city(this.seller.user.city).id;

          this.image = this.urlprof_img+this.seller.image;

          this.seller.providerSubcategoryList.forEach(p => {
            this.company_category.push(p);
          })

          this.citiesCombo2();

        });

      }
    }


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


  save() {
    const formData = new FormData();
    // console.log(this.seller);
    this.company_category.forEach(sub => {
      formData.append('idsubcategories', sub.subcategory.idsubcategory.toString())
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

    if (this.seller.startTime) {
      formData.append('startTime', this.seller.startTime.toString());
    }

    if (this.seller.endTime) {
      formData.append('endTime', this.seller.endTime.toString());
    }
    
    formData.append('facebook', this.seller.facebook);
    formData.append('instagram', this.seller.instagram);
    formData.append('youtube', this.seller.youtube);

    formData.append('id', this.seller.user.id.toString());
    formData.append('email', this.seller.user.email);
    formData.append('firstName', this.seller.user.firstName);
    formData.append('lastName', this.seller.user.lastName);

    if(this.fed){
      formData.append('federation', this.fed.toString());
    }else if(this.seller.user.federation){
      formData.append('federation', this.seller.user.federation.toString());      
    }

    if(this.city){
      formData.append('city', this.city.toString());
    }else if(this.seller.user.city){
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
        location.reload();
      } else {
        console.log("no se guardó");
      }

    }, error => console.log(error));
  }

  subCategoryAdded(event: Event): void {

    let d = parseInt((event.target as HTMLSelectElement)?.value)
    
    let sub=this.getSubcategoryById(d);

    let exist = false;
    this.company_category.forEach(c => {
      if (c.subcategory == sub) {
        exist = true;
        return;
      }
    });

    if (!exist) {
      this.company_category.push(new Company_subcategory(sub));
    }


  }

  getSubcategoryById(idsubcategory:number):Subcategory{

    let sub:Subcategory=new Subcategory();
    this.subcategories.forEach(s=>{
      if(s.idsubcategory==idsubcategory){
        sub = s;
        return;
      }
    })
    return sub;

  }

  deleteSubcategory(sub: number) {
    this.company_category.splice(sub, 1);
  }

  citiesCombo(event: Event) {
    let fed = parseInt((event.target as HTMLSelectElement)?.value);
    this.seller.user.federation = fed;
    this.citiesToCombo = selectListByFed(fed);
  }

  citiesCombo2() {
    this.citiesToCombo = selectListByFed(this.seller.user.federation);
  }

  selectedCity(event: Event) {
    this.city = parseInt((event.target as HTMLSelectElement)?.value);
    //this.seller.user.city = parseInt((event.target as HTMLSelectElement)?.value);
  }


}
