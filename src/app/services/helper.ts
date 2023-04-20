import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: string;
  private _idprovider: number=0;

  get user(): string {
    return this._user;
  }

  set user(user: string) {
    this._user = user;
  }

  get idprovider():number{
    return this._idprovider;
  }

  set idprovider(idprovider:number){
    this._idprovider = idprovider;
  }

}