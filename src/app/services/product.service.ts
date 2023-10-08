import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductImage } from '../models/product-image';
import { API_URL } from './helper';
import { Product2 } from '../models/product2';
import { Product2WithImages } from '../models/product2WithImages';
import { ProductSimple } from '../models/product-simple';
import { Truck, Truck2 } from '../models/truck';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private URL = `${API_URL}product`
  private URLimages = `${API_URL}productImage/product`
  private URL2 = `${API_URL}product/product2`
  private TRUCKURL = `${API_URL}truck`

  constructor(private httpClient: HttpClient) {}
 
  getAllFilters(defaultcategory:number,category:number, subcategory:number, federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${defaultcategory}/${category}/${subcategory}/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${pageNum}/28`)
  }

  getAllFilterSearch(federation: number, city:number, minPrice:number | undefined, maxPrice:number | undefined, keyword:string,pageNum:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/filter/${federation}/${city}/${minPrice==undefined?-1:minPrice}/${maxPrice==undefined?-1:maxPrice}/${keyword}/${pageNum}/28`)
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

  getAll(page:number):Observable<Product2[]>{
    return this.httpClient.get<Product2[]>(this.URL);
  }


  // truck services:
  saveTruck(form:FormData):Observable<number>{
    return this.httpClient.post<number>(this.TRUCKURL,form);
  }

  getOneTruck(idtruck:number):Observable<Truck>{
    return this.httpClient.get<Truck>(this.TRUCKURL+"/"+idtruck);
  }

  getOneTruck2(idtruck:number):Observable<Truck2>{
    return this.httpClient.get<Truck2>(this.TRUCKURL+"/2/"+idtruck);
  }

  getTruckBrands():Observable<any>{
    return this.httpClient.get<any>(this.TRUCKURL+"/truckbrand");
  }

  getTruckTypes():Observable<any>{
    return this.httpClient.get<any>(this.TRUCKURL+"/trucktype");
  }
  // end truck services
 

}
