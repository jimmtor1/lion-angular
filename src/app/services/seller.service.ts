import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller';
import { SellerByCategory } from '../models/seller-by-category';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private URL = "http://localhost:8080/provider";
  // private URL = "https://test1.dcl.ba/provider";


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
