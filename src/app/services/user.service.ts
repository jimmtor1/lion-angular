import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userr } from '../models/userr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8080/login';
  // private baseURL = 'https://test1.dcl.ba/login';

  private user = new Userr

  constructor(private http: HttpClient) { }
    
  isValidUser(user:Userr):Observable<Userr>{    
    
    // return new Observable<boolean>(observer => {
    //   this.http.post<boolean>(this.baseURL, user).subscribe(
    //     (isValid: boolean) => {
    //       observer.next(isValid);
    //       observer.complete();
    //     },
    //     ( error: any) => {
    //       observer.error(error);
    //     }
    //   );
    // });
        
     return this.http.post<Userr>(this.baseURL, user);
     
  }

}
