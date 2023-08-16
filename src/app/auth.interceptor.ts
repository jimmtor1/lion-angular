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
   
    const token = localStorage.getItem("token");   
    const exp = localStorage.getItem("exp"); 
     
    if(token){
      
      if(exp){      
       
        let now = parseInt(new Date().getTime().toString().substring(0, 10));

        if(now>=parseInt(exp)){
          localStorage.clear();
          location.reload();
          // this.router.navigate(['/']);  
          alert("your session has expired");
        }
      }
      
      const cloned = request.clone({        
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
     
      return next.handle(cloned);

    }
   
    return next.handle(request);
  }
}
