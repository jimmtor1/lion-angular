import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  // private URL = "http://localhost:8080/category";
  // private URL2 = "http://localhost:8080/subcategory/category";
  // private URL3 = "http://localhost:8080/subcategory/companyCategory";
  private URL = `${API_URL}category`;
  private URL2 = `${API_URL}subcategory/category`;
  private URL3 = `${API_URL}subcategory/companyCategory`;
  

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.URL);
  }

  getSubcategories(id:number):Observable<Subcategory[]>{
    return this.httpClient.get<Subcategory[]>(`${this.URL2}/${id}`);
  }

  getAllsub():Observable<Subcategory[]>{
    return this.httpClient.get<Subcategory[]>(`${this.URL3}`);
  }

}
