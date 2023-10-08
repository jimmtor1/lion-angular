import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCategory } from 'src/app/models/newCategory';
import { ProductImage } from 'src/app/models/product-image';
import { Product2 } from 'src/app/models/product2';
import { Seller } from 'src/app/models/seller';
import { CategoryService } from 'src/app/services/category.service';
import { IMG_PRODUCT_URL } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('imagelist') listaimg: ElementRef;

  @Input() id: number;

  images: imgclasification[] = [];
  product: Product2 = {
    idproduct: null,
    productName: "",
    description: "",
    price: 0,
    active: true,
    promotedTo: null,
    type: 1,
    mainImage: "",
    iduser: undefined,
    creationDate: undefined,
    promoteActive: false,
    categoryList: [] = [],
    visits: 0
  };

  productImage: ProductImage[] = [];
  filesTodelete: ProductImage[] = [];
  idimgnew: number = 0;
  priceRequest: boolean = false;
  iduser: number;
  addTitle: boolean = false;
  seller: Seller;
  authorizedSeller = false;
  loading = true;
  isNewProduct = true;
  next = false;
  showAdditionalData = false;

  categories: NewCategory[][] = [];

  urlprod_img = `${IMG_PRODUCT_URL}`;

  formData: FormData;

  constructor(private sellerService: SellerService, private renderer2: Renderer2, private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private modaService: ModalService) {
    this.formData = new FormData();
  }

  ngOnInit(): void {

    const u = localStorage.getItem("iduser");
    if (u) {
      this.iduser = JSON.parse(u);
      this.product.iduser = parseInt(u);
      this.sellerService.isActive(JSON.parse(u)).subscribe(s => {
        this.authorizedSeller = s

        if (s) {
          this.route.params.subscribe(params => {

            if (params['id']) {
              this.getProductById(params['id']);
              this.getImagesByid(params['id']);
              this.isNewProduct = false;

            } else {
              this.subcategoriesCombo2();
              this.loading = false;
            }
            
          })
        } else {
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }

  }


  getProductById(id: number) {
    this.productService.getProduc2byId(id).subscribe(bdproduct => {

      this.product = bdproduct;
      //  console.log(this.product); 
      this.subcategoriesCombo2();

      if (this.product.price == 0) {
        this.priceRequest = true;
      } else {
        this.priceRequest = false;
      }

      if (this.product.categoryList[1]) {
        if (this.product.categoryList[1].idcategory == 228) {
          this.next = true;
        }
      }
      this.loading = false;
      this.onFileSelected2();
    })
  }

  getImagesByid(idproduct: number) {
    this.productService.getImagesById(idproduct).subscribe(i => {
      this.productImage = i;
    });

  }

  subcategoriesCombo2() {
    this.categoryService.getSubcategories2().subscribe(subcategories => {

      this.categories.push(subcategories);
      if (!this.isNewProduct && this.product.categoryList.length > 2) {

        for (let index = 1; index < this.product.categoryList.length - 1; index++) {
          this.categoryService.getSublist(this.product.categoryList[index].idcategory).subscribe(data => {

            this.categories.push(data);
          });
        }

      }

    });



  }

  selectedSub(event: Event, i: number) {
    let idcategory = parseInt((event.target as HTMLSelectElement)?.value);

    if (this.product.categoryList.length >= i) {
      this.product.categoryList[i] = idcategory;
    } else {
      this.product.categoryList.push(idcategory);
    }

    while (this.categories.length > i + 1) {
      this.categories.pop();
    }

    this.fillSubList(idcategory);

    if (idcategory == 228) {
      this.next = true;
    }

  }

  fillSubList(idcategory: number) {
    this.categoryService.getSublist(idcategory).subscribe(s => {

      if (s.length > 0) {
        this.categories.push(s);

      }
    })
  }


  submit() {

    if (this.product.idproduct != undefined) {
      this.edit2();
    } else {
      this.save2();
    }

  }


  save2() {
    this.loading = true;
    //const formData = new FormData();

    this.images.forEach(file => {
      this.formData.append('imageList', file.file);
    })

    this.formData.append('productName', this.product.productName);
    this.formData.append('description', this.product.description);
    this.formData.append('price', this.product.price.toString());
    this.formData.append('type', this.product.type.toString());
    this.formData.append('iduser', this.product.iduser!.toString());


    this.product.categoryList.forEach((category: { toString: () => string | Blob; }) => {
      this.formData.append('prodcats', category.toString());
    });

    if (this.next) {
      this.next_previous(true);
    } else {
      this.productService.saveProduc2(this.formData).subscribe(p => {
        if (p && p.idproduct != undefined) {
          this.loading = false;
          this.modaService.openModal("Uspješno ste dodali vaš oglas.", "success");
          this.router.navigate(['panelseller/products']);
        }
      }, error => { console.log(error); this.loading = false })
    }


  }


  edit2() {

    this.images.forEach(file => {
      this.formData.append('imageList', file.file);
    })

    this.filesTodelete.forEach(imagename => {
      this.formData.append('filesTodelete', JSON.stringify(imagename));
    })

    this.formData.append('idproduct', this.product.idproduct!.toString());
    this.formData.append('productName', this.product.productName);
    this.formData.append('description', this.product.description);
    this.formData.append('price', this.product.price.toString());
    this.formData.append('type', this.product.type.toString());
    this.formData.append('iduser', this.product.iduser!.toString());
    this.formData.append('active', this.product.active.toString());
    this.formData.append('mainImage', this.product.mainImage);

    this.product.categoryList.forEach((category: { idcategory: string | Blob; }) => {
      this.formData.append('prodcats', category.idcategory);
    });

    let myDate = this.datePipe.transform(this.product.creationDate, 'yyyy-MM-dd HH:mm:ss');

    if (myDate !== null) {
      this.formData.append('creationDate2', myDate);
    }

    if (this.next) {
      this.next_previous(true);
    } else {
      this.productService.editAd(this.formData).subscribe(dato => {
        this.modaService.openModal("Uspješno ste izmijenili vaš oglas.", "success");
        this.router.navigate(['panelseller/products']);
      }, error => console.log(error));
    }



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

  priceonrequest() {
    if (this.priceRequest) {
      this.priceRequest = false;
    } else {
      this.priceRequest = true;
      this.product.price = 0;
    }


  }

  onFileSelected2() {
    this.productService.getImagesById(this.product.idproduct!).subscribe(productImg => {
      this.productImage = productImg;
      let im: imgclasification;

      for (let i = 0; i < productImg.length; i++) {
        im = new imgclasification();
        im.isNew = false;
        im.link = this.urlprod_img + productImg[i].extension;
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

    } else if (!im.isNew && imageElement !== null) {

      this.filesTodelete.push(im.productImage);

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

  next_previous(showAddtional: boolean) {
    this.showAdditionalData = showAddtional;
    this.loading = false;
  }


}

class imgclasification {

  productImage: ProductImage;
  isNew: boolean;
  link: string;
  id: string;
  file: File;

}



