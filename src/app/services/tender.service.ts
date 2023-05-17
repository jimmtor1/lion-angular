import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tender } from '../models/tender';
import { Observable } from 'rxjs/internal/Observable';
import { TenderProposal } from '../models/tender-proposal';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  // private URL = "https://test1.dcl.ba/tender";
  // private URL2 = "https://test1.dcl.ba/proposal";

  private URL = "http://localhost:8080/tender";
  private URL2 = "http://localhost:8080/proposal";

  constructor(private http:HttpClient) { }


  getListByIduser(iduser:number):Observable<Tender[]>{
    return this.http.get<Tender[]>(`${this.URL}/list/${iduser}`);
  }

  getListActiceTender():Observable<Tender[]>{
    return this.http.get<Tender[]>(`${this.URL}/activelist`);
  }

  getAuthorizedListTender():Observable<Tender[]>{
    return this.http.get<Tender[]>(`${this.URL}/authorized`);
  }

  setTenderAuthorize(idtender:number):Observable<Tender>{
    return this.http.get<Tender>(`${this.URL}/authorize/${idtender}`)
  }

  save(formData:FormData):Observable<Tender>{
    return this.http.post<Tender>(this.URL, formData);
  }

  getById(idtender:number):Observable<Tender>{
    return this.http.get<Tender>(`${this.URL}/${idtender}`);
  }

  getProposalList(idtender:number):Observable<TenderProposal[]>{
    return this.http.get<TenderProposal[]>(`${this.URL2}/${idtender}`);
  }

}
