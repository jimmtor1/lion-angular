import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product-image';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('imagelist') listaimg: ElementRef;

  @Input() id: number;

  images: imgclasification[] = [];
  // files: File[] = [];
  // selectedCategory: number;
  subcategories: Subcategory[];
  product: Product = new Product();
  //citiesToCombo: string[] = [];
  productImage: ProductImage[] = [];
  filesTodelete: ProductImage[] = [];
  idimgnew: number = 0;
  priceRequest:boolean=false;
  iduser:number;

  constructor(private renderer2: Renderer2, private categoryService: CategoryService, private productService: ProductService, private router: Router, private auth: AuthService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      
      if (params['id'] != null) {
        this.getUserById(params['id']);
      }else if(this.id>0){
        this.getUserById(this.id);
      }
    });

    const u = localStorage.getItem("iduser");
    if(u){
      this.iduser = JSON.parse(u);      
    }

    this.subcategoriesCombo2();
    // if(this.auth.idprovider==0){      
    //   this.router.navigate(['login']);
    // }
  }

  getUserById(id: number) {
    this.productService.getById(id).subscribe(bdproduct => {
      this.product = bdproduct;
      if(this.product.price==0){
        this.priceRequest = true;
      }else{
        this.priceRequest = false;
      }
      //this.citiesToCombo = this.cities[this.product.federation];
      this.onFileSelected2();
    })
  }

  // subcategoriesCombo(event: Event) {
  //   this.selectedCategory = parseInt((event.target as HTMLSelectElement)?.value);
  //   this.product.idcategory = this.selectedCategory;
  //   this.categoryService.getSubcategories(this.selectedCategory).subscribe(subcategories => {
  //     this.subcategories = subcategories;
  //   });
  // }

  subcategoriesCombo2() {
    this.categoryService.getSubcategories(5).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  selectedSub(event: Event) {
    this.product.idsubcategory = parseInt((event.target as HTMLSelectElement)?.value);
  }


  submit() {

    if (this.product.idproduct > 0) {     
      this.edit();
    } else {     
      this.save();
    }

  }

  save() {
    const formData = new FormData();
    this.images.forEach(file => {
      formData.append('files', file.file);
    })
    formData.append('productName', this.product.productName);
    formData.append('description', this.product.description);
    formData.append('idcategory', "5");
    formData.append('idsubcategory', this.product.idsubcategory.toString());

       
    formData.append('idprovider', this.iduser.toString());
    formData.append('active', this.product.active.toString());
    formData.append('price', this.product.price.toString());

    this.productService.saveAd(formData).subscribe(dato => {
      //this.router.navigate(['sellerpanel']);
      location.reload();
    }, error => console.log(error));
  }

  edit() {

    const formData = new FormData();

    this.images.forEach(file => {
      formData.append('filesTosave', file.file);
    })

    this.filesTodelete.forEach(imagename => {
      formData.append('filesTodelete', JSON.stringify(imagename));
    })

    formData.append('idproduct', this.product.idproduct.toString());
    formData.append('productName', this.product.productName);
    formData.append('description', this.product.description);
    formData.append('idcategory', "5");
    formData.append('idsubcategory', this.product.idsubcategory.toString());
 
    formData.append('idprovider', this.iduser.toString());
    formData.append('active', this.product.active.toString());
    formData.append('federation', this.product.federation.toString());
    formData.append('city', this.product.city.toString());
    formData.append('price', this.product.price.toString());

    let myDate = this.datePipe.transform(this.product.creationDate, 'yyyy-MM-dd HH:mm:ss');

    if (myDate !== null) {
      formData.append('creationDate2', myDate);
    }


    this.productService.editAd(formData).subscribe(dato => { 
      //this.router.navigate(['sellerpanel']);
      location.reload();         
    }, error => console.log(error));

    // this.productService.editAd2(this.filesTodelete).subscribe(dato => {
    //   this.router.navigate(['panelAnuncios']);
    // }, error => console.log(error));

  }

  onFileSelected(event: any) {
    // console.log(event.target.files[0]);
    const files: FileList = event.target.files;
    let im: imgclasification;
    for (let i = 0; i < files.length; i++) {
      //this.files.push(files[i]);
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onload = (e: any) => {
        im = new imgclasification();
        im.isNew = true;
        im.link = e.target.result;
        im.id = "newimg" + this.idimgnew++;
        im.file = files[i];
        this.images.push(im);
      };

    }
  }

  priceonrequest(){
    if(this.priceRequest){
      this.priceRequest = false;      
    }else{
      this.priceRequest = true;
      this.product.price = 0;
    }    


  }

  onFileSelected2() {
    this.productService.getImagesById(this.product.idproduct).subscribe(productImg => {
      this.productImage = productImg;
      let im: imgclasification;

      for (let i = 0; i < productImg.length; i++) {
        im = new imgclasification();
        im.isNew = false;
        im.link = "./assets/images/" + productImg[i].idimage + productImg[i].extension;
        im.id = productImg[i].idimage.toString();       
        im.productImage = productImg[i];      
        this.images.push(im);
      }

    });
  }

  removeImage(im: imgclasification): void {

    const imageElement = document.getElementById(`${im.id}`);
   
    if (im.isNew && imageElement !== null) {
     
      imageElement.remove();
      let index = this.images.indexOf(im);
      this.images.splice(index, 1);
      alert("num images" + this.images.length);

    } else if (!im.isNew && imageElement !== null) {
    
      this.filesTodelete.push(im.productImage);
      // console.log(this.filesTodelete[0]);
      imageElement.remove();
      let index = this.images.indexOf(im);
      this.images.splice(index, 1);

    }


  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = (<HTMLInputElement>event.target).files;
    const listofimg = this.listaimg;
    if (files) {
      if (files.length > 0) {

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;
          const li = document.createElement('li');
          li.appendChild(img);

          this.renderer2.appendChild(listofimg, li);

        };
        reader.readAsDataURL(files[0]);
      }
    }

  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }


}

class imgclasification {

  productImage: ProductImage;
  isNew: boolean;
  link: string;
  id: string;
  file:File;

}
