import { Component, HostListener } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { Product2 } from 'src/app/models/product2';
import { Seller } from 'src/app/models/seller';
import { BannerService } from 'src/app/services/banner.service';
import { IMG_BANNER_URL, IMG_PROFILE_URL, select_city } from 'src/app/services/helper';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  products: Product2[] = [];
  sellers: Seller[];
  urlprof_img = `${IMG_PROFILE_URL}`;
  urlbanner_img = `${IMG_BANNER_URL}`;
  banner: Banner[] = [];
  pagePromoted = -1;
  pageUnpromoted = -1;

  totalPagesPromoted: number;
  totalPagesUnpromoted: number;

  ChargedPromotedPages: number[] = [];
  ChargedUnpromotedPages: number[] = [];

  cargando = false;

  triggerChild: boolean = false;
  allowScroll = false;
  grilla = "col-6 col-sm-4 col-md-4 col-lg-3"

  constructor(private productService: ProductService, private providerService: SellerService, private bannerService: BannerService) {

    this.productList();

    this.providerService.getAllRandomWhitLimit(8).subscribe(data => {
      this.sellers = data;
    });

    this.bannerService.getAll().subscribe(b => {
      this.banner = b;
    });


  }

  onChildProcedureFinished() {
    this.triggerChild = false; // Habilita el botón nuevamente
    this.allowScroll = true;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // console.log(this.cargando);
    if (!this.cargando) {

      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight * 0.95) {
        this.allowScroll = false;
        this.triggerChild = true;
        //this.productList();
      }
    }
  }

  get_city(id: number): string {

    if (id) {
      return select_city(id).name;
    } else {
      return "No city";
    }

  }

  getRandomNumberInRange(min: number, max: number, excludedNumbers: number[]): number {
    let randomNumber: number;

    do {
      // Genera un número aleatorio dentro del rango (incluyendo "max" como valor posible)
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludedNumbers.includes(randomNumber));

    return randomNumber;
  }


  productList() {
    this.cargando = true;
    // //verificar cual consulta realizar
    // console.log("menor a esto")
    // console.log("this.ChargedPromotedPages.length "+this.ChargedPromotedPages.length)
    // console.log("this.totalPagesPromoted "+this.totalPagesPromoted)
    // console.log("totalpagespromoted " + this.totalPagesPromoted)
    // console.log("totalpagesunpromoted" + this.totalPagesUnpromoted) 
    if ((!this.totalPagesPromoted && !this.totalPagesUnpromoted) || this.ChargedPromotedPages.length < this.totalPagesPromoted) {

      this.productService.getProducs2All(this.pagePromoted, this.pageUnpromoted).subscribe(data => {

        if (data.promotedProducts.content.length > 0) {

          this.products = this.products.concat(data.promotedProducts.content);

          this.ChargedPromotedPages.push(data.promotedProducts.pageable.pageNumber)
          this.totalPagesPromoted = data.promotedProducts.totalPages;
          if (this.ChargedPromotedPages.length < this.totalPagesPromoted) {
            this.pagePromoted = this.getRandomNumberInRange(0, this.totalPagesPromoted - 1, this.ChargedPromotedPages);
          }

        } else {
          this.totalPagesPromoted = 0;
        }

        if (data.unpromotedProducts) {
          this.products = this.products.concat(data.unpromotedProducts.content);
          this.ChargedUnpromotedPages.push(data.unpromotedProducts.pageable.pageNumber)
          this.totalPagesUnpromoted = data.unpromotedProducts.totalPages;
          if (this.ChargedUnpromotedPages.length < this.totalPagesUnpromoted) {
            this.pageUnpromoted = this.getRandomNumberInRange(0, this.totalPagesUnpromoted - 1, this.ChargedUnpromotedPages);
          }
        }

        this.cargando = false;

      })

    }
    else if (this.ChargedPromotedPages.length == this.totalPagesPromoted && (this.ChargedUnpromotedPages.length != this.totalPagesUnpromoted)) {

      this.productService.getProducs2All2(this.pageUnpromoted).subscribe(data => {

        if (data) {
          this.products = this.products.concat(data.content);
          this.ChargedUnpromotedPages.push(data.pageable.pageNumber)
          this.totalPagesUnpromoted = data.totalPages;
          if (this.ChargedUnpromotedPages.length < this.totalPagesUnpromoted) {
            this.pageUnpromoted = this.getRandomNumberInRange(0, this.totalPagesUnpromoted - 1, this.ChargedUnpromotedPages);
          }
        }
        this.cargando = false;
      });

    } else {

      this.cargando = false;

    }


  }

}
