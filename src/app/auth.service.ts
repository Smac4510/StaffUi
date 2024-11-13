import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private route: Router) {}

  staffId: any;
  token: any;
  custId: any;

  setPersonalToken(tokenID: any){
    this.token = tokenID;
  }

  getPersonalToken(): any {
    return this.token;
  }

  // removePersonaToken() {
  //   this.token = null;
  // }

  setStaffId(id: any) {
    this.staffId = id;
  }

  getStaffId(): any {
    return this.staffId;
  }

  setCustId(id: any) {
    this.custId = id;
  }

  getCustId(){
    return this.custId;
  }
}
