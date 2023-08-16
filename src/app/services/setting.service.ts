import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "./helper";

@Injectable({
    providedIn: 'root'
})

export class SettingService{

    private URL = `${API_URL}`
    constructor(private httpCliente:HttpClient){}

    saveImage(form : FormData):Observable<boolean>{
        return this.httpCliente.post<boolean>(this.URL+'setting ',form);
    }

}