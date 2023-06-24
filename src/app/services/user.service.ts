import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userr } from '../models/userr';
import { Observable, map } from 'rxjs';
import { API_URL } from './helper';
import { UserDto, token } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseURL = 'http://localhost:8080/login';
  private baseURL = `${API_URL}`;

  private user = new Userr();

  constructor(private http: HttpClient) { }
    
  isValidUser(user:Userr):Observable<Userr>{   
    
    return this.http.post<Userr>(`${this.baseURL}inicio`, user);
     
  }

  getById(id:number):Observable<Userr>{
    return this.http.get<Userr>(`${this.baseURL}inicio/${id}`);
  }

  login(userDto:UserDto):Observable<token>{
    
    return this.http.post<token>(`${this.baseURL}inicio/authenticate`, userDto)
    

    // return this.http.post(`${this.baseURL}inicio/authenticate`, userDto, {      
    //   observe: 'response'
      
    // }).pipe(map((response:HttpResponse<any>)=>{
      
    //   const body = response.body;
    //   const headers = response.body;
    //   console.log("pipe");
    //   const bearerToken = headers.get('Authorization')!;
    //   const token = bearerToken.replace('Bearer ', '');

    //   localStorage.setItem('token', token);
      
    //   return body;
    // }));
    
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
