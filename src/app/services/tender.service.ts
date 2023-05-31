import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tender } from '../models/tender';
import { Observable } from 'rxjs/internal/Observable';
import { TenderProposal } from '../models/tender-proposal';
import { API_URL } from './helper';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private URL = `${API_URL}tender`;
  private URL2 = `${API_URL}proposal`;

  // private URL = "http://localhost:8080/tender";
  // private URL2 = "http://localhost:8080/proposal";

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

  unauthorizeTender(idtender:number):Observable<Tender>{
    return this.http.get<Tender>(`${this.URL}/unauthorize/${idtender}`);
  }

  setTenderAuthorize(idtender:number):Observable<Tender>{
    return this.http.get<Tender>(`${this.URL}/authorize/${idtender}`)
  }

  save(formData:FormData):Observable<Tender>{
    return this.http.post<Tender>(this.URL, formData);
  }

  saveProposal(formData:FormData):Observable<TenderProposal>{
    return this.http.post<TenderProposal>(this.URL2, formData);
  }

  confirmAlreadyPosted(idtender:number, iduser:number):Observable<TenderProposal>{
    return this.http.get<TenderProposal>(`${this.URL2}/already/${idtender}/${iduser}`)
  }

  getById(idtender:number):Observable<Tender>{
    return this.http.get<Tender>(`${this.URL}/${idtender}`);
  }

  getProposalList(idtender:number):Observable<TenderProposal[]>{
    return this.http.get<TenderProposal[]>(`${this.URL2}/${idtender}`);
  }

  getOwnProposal(idtender:number, iduser:number):Observable<TenderProposal>{
    return this.http.get<TenderProposal>(`${this.URL2}/${idtender}/${iduser}`);
  }

}
