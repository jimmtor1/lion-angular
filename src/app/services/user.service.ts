import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userr } from '../models/userr';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_URL } from './helper';
import { UserDto, token } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = `${API_URL}`;

  private user = new Userr();

  constructor(private http: HttpClient) { }
    
  isValidUser(user:Userr):Observable<Userr>{   
    
    return this.http.post<Userr>(`${this.baseURL}start`, user);
     
  }

  getById(id:number):Observable<Userr>{
    return this.http.get<Userr>(`${this.baseURL}start/${id}`);
  }

  login(userDto:UserDto):Observable<token>{
    
    return this.http.post<token>(`${this.baseURL}start/authenticate`, userDto)
        
  }

  getToken(){
    return localStorage.getItem('token')
  }

  sendemail(email:string):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}email`, email).pipe(catchError(error => {return throwError("error")}));
  }

  resetPassword(form:FormData):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}start/reset`, form).pipe(
      catchError(error => {return throwError('error');})
    );

  }

}
