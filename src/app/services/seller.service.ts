import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // private URL = "http://localhost:8080/provider";
  private URL = "http://test1.dcl.ba/provider";

  constructor(private http:HttpClient) { }

  getById(id:number):Observable<Seller>{
    return this.http.get<Seller>(`${this.URL}/${id}`);
  }

}
