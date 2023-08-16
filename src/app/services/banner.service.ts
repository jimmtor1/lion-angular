import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Banner } from "../models/banner";
import { Observable } from "rxjs";
import { API_URL } from "src/app/services/helper"

@Injectable({
 providedIn: 'root'
})

export class BannerService{

    private URL = `${API_URL}banner`;

    constructor(private httpClient:HttpClient){}

    getAll():Observable<Banner[]>{

        return this.httpClient.get<Banner[]>(this.URL);

    }

};