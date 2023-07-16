import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private coinsQuantity:number=0;
  private coinsQuantitySubjet = new Subject<number>

  constructor() { }

  setCoins(quantity:number){
    this.coinsQuantity += quantity
    this.coinsQuantitySubjet.next(this.coinsQuantity);
  }

  getCoins():number{
    return this.coinsQuantity;
  }

  getCoinsQuantityObservable() {
    return this.coinsQuantitySubjet.asObservable();
  }


}
