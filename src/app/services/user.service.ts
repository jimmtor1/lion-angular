import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userr } from '../models/userr';
import { Observable } from 'rxjs';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseURL = 'http://localhost:8080/login';
  private baseURL = `${API_URL}login`;

  private user = new Userr();

  constructor(private http: HttpClient) { }
    
  isValidUser(user:Userr):Observable<Userr>{   
    
    return this.http.post<Userr>(this.baseURL, user);
     
  }

  getById(id:number):Observable<Userr>{
    return this.http.get<Userr>(`${this.baseURL}/${id}`);
  }

}
