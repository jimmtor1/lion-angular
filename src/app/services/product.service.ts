import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductImage } from '../models/product-image';
import { API_URL } from './helper';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private URL = `${API_URL}product`
  private URLimages = `${API_URL}productImage/product`

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

  getAllByDefaultCategory(idcategory: number,): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/default/${idcategory}`);
  }

  getById(id: number,): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/${id}`);
  }

  getFilterFederationCity(idcategory:number,idsubcategory:number, idfed:number, idcity:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.URL}/filter-f-c/${idcategory}/${idsubcategory}/${idfed}/${idcity}`);
  }

  getFilterPrice(idcategory:number,idsubcategory:number, fed:number, city:number,price1:number, price2:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.URL}/filterprice/${idcategory}/${idsubcategory}/${fed}/${city}/${price1}/${price2}`);
  }

  getAllFilters(category:number, subcategory:number, federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${category}/${subcategory}/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${pageNum}/28`)
  }

  getAllFilterSearch(federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, keyword:string,pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${keyword}/${pageNum}/28`)
  }

  getSearchProduct(word:string):Observable<Product[]>{
   // return this.httpClient.get<Product[]>(this.URL);
    
    return this.httpClient.get<Product[]>(`${this.URL}/search/${word}`);
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
