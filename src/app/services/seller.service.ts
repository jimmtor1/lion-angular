import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // private URL = "http://localhost:8080/provider";
  private URL = `${API_URL}provider`


  constructor(private http:HttpClient) { }

  getAllPageable(pageNum:number):Observable<any>{
    return this.http.get<any>(`${this.URL}/${pageNum}/50`)
  }

  getAllFilters(category:number, subcategory:number, federation: number, city:number,pageNum:number):Observable<any>{
    return this.http.get<any>(`${this.URL}/filter/${category}/${subcategory}/${federation}/${city}/${pageNum}/28`)
  }

  getById(id:number):Observable<Seller>{
    return this.http.get<Seller>(`${this.URL}/${id}`);
  }

  getAllAccepted():Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/accepted`);
  }

  getAllProcess():Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/process`);
  }

  getFilterSub(idsub:number, idfed:number, idcity:number):Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/filter-s/${idsub}/${idfed}/${idcity}`);
  }

  getFilterCat(idcat:number, idfed:number, idcity:number):Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/filter-c/${idcat}/${idfed}/${idcity}`);
  }

  save(formData: FormData):Observable<Seller>{
    return this.http.post<Seller>(this.URL, formData);
  }

  // getAllByCategory(){
  //   return this.http.get<SellerByCategory[]>(`${this.URL}/category`);
  // }

  getAllRandomWhitLimit(limit:number):Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/randomlist/${limit}`);
  }

  getAllByCategoryId(idsub:number){
    return this.http.get<Seller[]>(`${this.URL}/category/${idsub}`);
  }

  getAllBySubcategory(idsub:number){
    return this.http.get<Seller[]>(`${this.URL}/subcategory/${idsub}`);
  }

  acceptById(id:number):Observable<Seller>{
    return this.http.get<Seller>(`${this.URL}/active/${id}`);
  }

  deactivateById(id:number):Observable<Seller>{
    return this.http.get<Seller>(`${this.URL}/deactivate/${id}`);
  }

  saveWithoutForm(seller:Seller):Observable<Seller>{
   
    return this.http.post<Seller>(`${this.URL}/socialSave`, seller);
  }

  isActive(id:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.URL}/state/${id}`)
  }

}
