import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductImage } from '../models/product-image';
import { API_URL } from './helper';
import { Product2 } from '../models/product2';
import { Product2WithImages } from '../models/product2WithImages';
import { ProductSimple } from '../models/product-simple';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private URL = `${API_URL}product`
  private URLimages = `${API_URL}productImage/product`
  private URL2 = `${API_URL}product/product2`

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

  getAllFilters(defaultcategory:number,category:number, subcategory:number, federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${defaultcategory}/${category}/${subcategory}/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${pageNum}/28`)
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

  promote(form:FormData):Observable<number>{
    return this.httpClient.post<number>(`${this.URL}/promote`, form);
  }

  removePromotion(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.URL}/promotion/${id}/remove`);
  }

  // __________________________________________________________________

  //get data product2
  getProducs2bycagetory(idcategory: number): Observable<ProductSimple[]>{
    return this.httpClient.get<ProductSimple[]>(`${this.URL2}/${idcategory}`);
  }

  saveProduc2(formData: FormData): Observable<Product2> {
    return this.httpClient.post<Product2>(this.URL2, formData);
  }

  getProducs2byuser(iduser: number): Observable<ProductSimple[]>{
    return this.httpClient.get<ProductSimple[]>(`${this.URL2}/provider/${iduser}`);
  }

  getProduc2byId(id: number): Observable<Product2WithImages>{
    return this.httpClient.get<Product2WithImages>(`${this.URL2}/one/${id}`);
  }

  getProducs2bykeyword(keword: string): Observable<ProductSimple[]>{
    return this.httpClient.get<ProductSimple[]>(`${this.URL2}/search/${keword}`);
  }

  getProducs2All(pagePromoted: number, pageUnpromoted:number): Observable<any>{
    return this.httpClient.get<any>(`${this.URL2}/all/${pagePromoted}/${pageUnpromoted}`);
  }

  getProducs2All2(pageUnpromoted:number): Observable<any>{
    return this.httpClient.get<any>(`${this.URL2}/Unpromoted/${pageUnpromoted}`);
  }

  getProducts2AllFilters(category:number, federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${category}/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${pageNum}`)
  }

 

}
