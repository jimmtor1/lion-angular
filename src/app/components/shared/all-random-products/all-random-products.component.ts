import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductSimple } from 'src/app/models/product-simple';
import { ProductService } from 'src/app/services/product.service';
import { ProviousProductsService } from 'src/app/services/provious-products.service';


@Component({
  selector: 'all-random-products',
  templateUrl: './all-random-products.component.html',
  styleUrls: ['./all-random-products.component.css']
})
export class AllRandomProductsComponent implements OnInit, OnChanges {

  @Input() triggerProcedure: boolean = false;
  @Input() grilla: string = "";
  @Output() procedureFinished = new EventEmitter<void>();

  // products: ProductSimple[] = [];

  pagePromoted = -1;
  pageUnpromoted = -1;

  totalPagesPromoted: number;
  totalPagesUnpromoted: number;

  // ChargedPromotedPages: number[] = [];
  // ChargedUnpromotedPages: number[] = [];

  loading = false;


  constructor(private productService: ProductService, public previousProd: ProviousProductsService) { }

  ngOnInit(): void {
    this.productList();
  }

  ngOnChanges(changes: SimpleChanges): void {   
    if (changes['triggerProcedure'].currentValue) {
      if (!this.loading) {
        this.productList();
      }
    }
  }

  productList() {
    this.loading = true;
    // console.log("ChargedPromotedPages.length: "+this.ChargedPromotedPages.length)
    // console.log("ChargedUnpromotedPages.length: "+this.ChargedUnpromotedPages.length)
    // console.log("totalpagespromoted: " + this.totalPagesPromoted)
    // console.log("totalpagesunpromoted: " + this.totalPagesUnpromoted) 
    if ((!this.totalPagesPromoted && !this.totalPagesUnpromoted) || this.previousProd.ChargedPromotedPages.length < this.totalPagesPromoted) {

      if (this.pagePromoted == -1 && this.pageUnpromoted == -1 && this.previousProd.products.length > 0) {
       
        if (this.previousProd.ChargedPromotedPages.length < this.totalPagesPromoted) {
          this.pagePromoted = this.getRandomNumberInRange(0, this.totalPagesPromoted - 1, this.previousProd.ChargedPromotedPages);
        }
        if (this.previousProd.ChargedUnpromotedPages.length < this.totalPagesUnpromoted) {
          this.pageUnpromoted = this.getRandomNumberInRange(0, this.totalPagesUnpromoted - 1, this.previousProd.ChargedUnpromotedPages);
        }

      }


      this.productService.getProducs2All(this.pagePromoted, this.pageUnpromoted).subscribe(data => {
       
        if (data.promotedProducts.content.length > 0) {

          this.setAllPromoted(data.promotedProducts.content);
          this.previousProd.products = this.previousProd.products.concat(data.promotedProducts.content);
          this.previousProd.ChargedPromotedPages.push(data.promotedProducts.pageable.pageNumber)
          this.totalPagesPromoted = data.promotedProducts.totalPages;
          if (this.previousProd.ChargedPromotedPages.length < this.totalPagesPromoted) {
            this.pagePromoted = this.getRandomNumberInRange(0, this.totalPagesPromoted - 1, this.previousProd.ChargedPromotedPages);
          }

        } else {
          this.totalPagesPromoted = 0;
        }

        if (data.unpromotedProducts.content.length > 0) {
          this.previousProd.products = this.previousProd.products.concat(data.unpromotedProducts.content);
          this.previousProd.ChargedUnpromotedPages.push(data.unpromotedProducts.pageable.pageNumber)
          this.totalPagesUnpromoted = data.unpromotedProducts.totalPages;
          if (this.previousProd.ChargedUnpromotedPages.length < this.totalPagesUnpromoted) {
            this.pageUnpromoted = this.getRandomNumberInRange(0, this.totalPagesUnpromoted - 1, this.previousProd.ChargedUnpromotedPages);
          }
        }

        this.loading = false;
        this.triggerProcedure = false;
        this.procedureFinished.emit();

      })
      // }

    }
    else if (this.previousProd.ChargedPromotedPages.length == this.totalPagesPromoted && (this.previousProd.ChargedUnpromotedPages.length != this.totalPagesUnpromoted)) {
      this.productService.getProducs2All2(this.pageUnpromoted).subscribe(data => {

        if (data) {
          this.previousProd.products = this.previousProd.products.concat(data.content);
          this.previousProd.ChargedUnpromotedPages.push(data.pageable.pageNumber)
          this.totalPagesUnpromoted = data.totalPages;
          if (this.previousProd.ChargedUnpromotedPages.length < this.totalPagesUnpromoted) {
            this.pageUnpromoted = this.getRandomNumberInRange(0, this.totalPagesUnpromoted - 1, this.previousProd.ChargedUnpromotedPages);
          }
        }
        this.loading = false;
        this.triggerProcedure = false;
        this.procedureFinished.emit();
      });

    } else {
      this.loading = false;
      this.triggerProcedure = false;
    }

  }

  setAllPromoted(productSimple: ProductSimple[]) {
    productSimple.forEach(p => {
      p.promoteActive = true;
    });
  }


  getRandomNumberInRange(min: number, max: number, excludedNumbers: number[]): number {
    let randomNumber: number;

    do {
      // Genera un número aleatorio dentro del rango (incluyendo "max" como valor posible)
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludedNumbers.includes(randomNumber));

    return randomNumber;
  }


}
