import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/models/coin';
import { API_URL } from 'src/app/services/helper';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private baseUrl = `${API_URL}`;

  constructor(private http: HttpClient) { }

  buy_coins(data:FormData):Observable<boolean>{    
    return this.http.post<boolean>(`${this.baseUrl}promotions`, data);
  }

  getCoins(iduser:number):Observable<number>{
    return this.http.get<number>(this.baseUrl + 'provider/' + iduser + '/coins');
  }

  getListCoinsByUser(iduser:number, page:number):Observable<Coin[]>{
    return this.http.get<Coin[]>(this.baseUrl + 'promotions/' + iduser + '/' + page);
  }

}
