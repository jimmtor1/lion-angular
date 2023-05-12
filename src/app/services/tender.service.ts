import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tender } from '../models/tender';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private URL = "http://localhost:8080/tender";

  constructor(private http:HttpClient) { }


  getListByIduser(iduser:number):Observable<Tender[]>{
    return this.http.get<Tender[]>(`${this.URL}/list/${iduser}`);
  }

  save(tender:Tender):Observable<Tender>{
    return this.http.post<Tender>(this.URL, tender);
  }

}
