import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private URL = "http://localhost:8080/category";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.URL);
  }


}
