import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller';
import { SellerByCategory } from '../models/seller-by-category';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // private URL = "http://localhost:8080/provider";
  private URL = `${API_URL}provider`


  constructor(private http:HttpClient) { }

  getById(id:number):Observable<Seller>{
    return this.http.get<Seller>(`${this.URL}/${id}`);
  }

  getAllAccepted():Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/accepted`);
  }

  getAllProcess():Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.URL}/process`);
  }

  save(formData: FormData):Observable<Seller>{
    return this.http.post<Seller>(this.URL, formData);
  }

  getAllByCategory(){
    return this.http.get<SellerByCategory[]>(`${this.URL}/category`);
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
    console.log("savewidthot");
    return this.http.post<Seller>(`${this.URL}/socialSave`, seller);
  }

}
