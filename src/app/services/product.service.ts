import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductImage } from '../models/product-image';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  // private URL = "http://localhost:8080/product";
  // private URLimages = "http://localhost:8080/productImage/product"
  private URL = "https://test1.dcl.ba/product";
  private URLimages = "https://test1.dcl.ba/productImage/product"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL);
  }

  getAllByCategory(idcategory: number, idsubcategory: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/category/${idcategory}/${idsubcategory}`);
  }

  getAllByProvider(idprovider: number,): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/provider/${idprovider}`);
  }

  getById(id: number,): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/${id}`);
  }

  saveAd(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.URL, formData);
  }

  getImagesById(id: number): Observable<ProductImage[]> {
    return this.httpClient.get<ProductImage[]>(`${this.URLimages}/${id}`);
  }

  editAd(formData: FormData): Observable<string> {

    return this.httpClient.put<string>(`${this.URL}`, formData);

  }

  editAd2(producImage: ProductImage[]): Observable<any> {

    return this.httpClient.put<any>(`${this.URL}/w`, producImage);


  }


}
