import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private URL = "http://localhost:8080/order";
  private URL = `${API_URL}order`

  constructor(private http:HttpClient) { }

  getByIdBuyer(idseller:number):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.URL}/c/${idseller}`);      
  }

  


}
