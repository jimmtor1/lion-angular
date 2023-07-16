import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  static isSameDate(date1: Date, date2: Date): boolean {
    if (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  static isGreaterDate(dateGreater: Date, dateLess: Date): boolean {

    let time1 = new Date(dateGreater).getTime();    
    let time2 = new Date(dateLess).getTime();
    
    return time1 > time2;
  }

}
