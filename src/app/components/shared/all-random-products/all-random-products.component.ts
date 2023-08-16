import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductSimple } from 'src/app/models/product-simple';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'all-random-products',
  templateUrl: './all-random-products.component.html',
  styleUrls: ['./all-random-products.component.css']
})
export class AllRandomProductsComponent implements OnInit, OnChanges {

  @Input() triggerProcedure: boolean = false;
  @Input() grilla: string = "";
  @Output() procedureFinished = new EventEmitter<void>();

  products: ProductSimple[] = [];
  pagePromoted = -1;
  pageUnpromoted = -1;

  totalPagesPromoted: number;
  totalPagesUnpromoted: number;

  ChargedPromotedPages: number[] = [];
  ChargedUnpromotedPages: number[] = [];

  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerProcedure'].currentValue) {
      //console.log("escuchado")
      this.productList();
    }
  }

  productList() {
    this.loading = true;
    // console.log("productList mothot")
    // //verificar cual consulta realizar
    // console.log("menor a esto")
    // console.log("this.ChargedPromotedPages.length "+this.ChargedPromotedPages.length)
    // console.log("this.totalPagesPromoted "+this.totalPagesPromoted)
    // console.log("totalpagespromoted " + this.totalPagesPromoted)
    // console.log("totalpagesunpromoted" + this.totalPagesUnpromoted) 
    if ((!this.totalPagesPromoted && !this.totalPagesUnpromoted) || this.ChargedPromotedPages.length < this.totalPagesPromoted) {

      this.productService.getProducs2All(this.pagePromoted, this.pageUnpromoted).subscribe(data => {

        if (data.promotedProducts.content.length > 0) {
          this.setAllPromoted(data.promotedProducts.content);
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

        this.loading = false;
        this.procedureFinished.emit();

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
        this.loading = false;
        this.procedureFinished.emit();
      });

    } else {

      this.loading = false;
      //console.log("emitieondo")
      //this.procedureFinished.emit();

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
