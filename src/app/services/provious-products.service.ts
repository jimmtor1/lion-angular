import { Injectable } from '@angular/core';
import { ProductSimple } from '../models/product-simple';

@Injectable({
  providedIn: 'root'
})

export class ProviousProductsService {

  constructor() { }

  products: ProductSimple[] = [];
  ChargedPromotedPages: number[] = [];
  ChargedUnpromotedPages: number[] = [];

}
