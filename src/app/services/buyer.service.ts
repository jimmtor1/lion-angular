import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buyer } from '../models/buyer';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller';

@Injectable({
  providedIn: 'root'
})

export class BuyerService {

  private baseUrl = 'https://test1.dcl.ba/buyer';
  private baseUrl2 = 'https://test1.dcl.ba/provider';
  // private baseUrl = 'http://localhost:8080/buyer';
  // private baseUrl2 = 'http://localhost:8080/provider';

  constructor(private http: HttpClient) { }

  createBuyer(buyer:Buyer):Observable<Buyer>{     
    return this.http.post<Buyer>(`${this.baseUrl}`, buyer); 
  }

  createSeller(seller:Seller):Observable<Seller>{   
    return this.http.post<Seller>(this.baseUrl2, seller);
  }

}
