import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('interceptando')
    const token = localStorage.getItem("token");   
    const exp = localStorage.getItem("exp"); 
     
    if(token){
      
      if(exp){      
       
        let now = parseInt(new Date().getTime().toString().substring(0, 10));

        if(now>=parseInt(exp)){
          alert("your session has expired");
          localStorage.clear();
          this.router.navigate(['login']);          
        }
      }
      
      const cloned = request.clone({        
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('interceptando ' + JSON.stringify(cloned))
      return next.handle(cloned);

    }
   
    return next.handle(request);
  }
}
