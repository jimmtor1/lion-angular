import { Injectable } from '@angular/core';
import { NewCategory } from '../models/newCategory';

@Injectable({
  providedIn: 'root'
})
export class MapCategoryService {

  level1: Map<number, NewCategory[]> = new Map();
  level2: Map<number, NewCategory[]> = new Map();
  level3: Map<number, NewCategory[]> = new Map();

  constructor() { }

  set(key: number, value: any, level: number): void {

    switch (level) {
      case 1: {
        this.level1.set(key, value);
      }
        break;
      case 2: {
        this.level2.set(key, value);
      }
        break;
      case 3: {
        this.level3.set(key, value);
      }
    }


  }

  get(key: number, level: number): any {

    switch (level) {
      case 1: {
        return this.level1.get(key);
      }
      case 2: {
        return this.level2.get(key);
      }
      case 3: {
        return this.level3.get(key);
      }
    }

  }

  has(key: number, level:number): boolean {

    switch (level) {
      case 1: {
        return this.level1.has(key);
      }
      case 2: {
        return this.level2.has(key);
      }
      case 3: {
        return this.level3.has(key);
      }
      default: return false;
    }    
  }

  

}
