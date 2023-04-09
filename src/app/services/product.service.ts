import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private URL = "http://localhost:8080/product";

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.URL);
  }


}
