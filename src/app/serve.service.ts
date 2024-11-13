import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServeService {
  private apiUrl = 'http://localhost:8000/api/';
  token = localStorage.getItem('personal_access_token');


  constructor(private http: HttpClient
  ) {

  }

  logins(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + "AdminLogin", { email, password});
  }

  setToken(token: string): void {
    localStorage.setItem('personal_access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('personal_access_token');
  }

  isLoggedIn(): boolean {
    //
    return !!this.getToken();
  }

  setStaffID(id: any): any {
    localStorage.setItem('staffID', id);
  }

  getStaffID(): any | null {
    localStorage.getItem('staffID');
  }

  logout() {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    if (!this.token) {
      console.error('No token found in local storage');
      return;
    }

    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log(headers);

    this.http.post(this.apiUrl + "logout", {}, { headers }).subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('personal_access_token');
        console.log(this.token);
      },
      (error) => {
        localStorage.removeItem('personal_access_token');
        console.error('Error during logout', error);
      }
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('personal_access_token');
    return !!token;
  }

  getStaff(): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    // this.http.get('http://localhost:8000/api/user', { headers }).subscribe(
    //   response => {
    //       console.log(response);
    //   },
    //   error => {
    //       console.error('Error:', error);
    //   }
    // );
    return this.http.get(this.apiUrl + "user", { headers });
  }

  getCust(): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    // return this.http.get(this.apiUrl + "custDisplay", {headers: this.headers});
    return this.http.get(`${this.apiUrl}custDisplay`, { headers });
  }

  getCustHist(custId: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.apiUrl + "getCustHist/" + custId, { headers } );
  }

  getCustShow(custId: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.apiUrl + "getCustShow/" + custId, { headers } );
  }

  getTransaction(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + "Transaction", { headers });
  }

  getTransactionRel(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + "TransactionRel", { headers });
  }

  getExp(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + "dispListExp", { headers });
  }

  addExp(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + "addExp", data, { headers });
  }

  uploadExpImg(id: any, expImg: File): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('Expense_ID', id);
    formData.append('file', expImg);

    return this.http.post(this.apiUrl + "uploadExpImg", formData, { headers});
  }

  getExpReceipt(expId: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "getExpReceipt/" + expId, { headers });
  }

  getCustTransaction(transId: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "getTransCust/" + transId, { headers });
  }

  getLaundryDetails(transId: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "getLaundryDetails/" + transId, { headers });
  }

  getAddService(transID: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "getAddService/" + transID, { headers });
  }

  saveLaundryDetails(data: any){
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + "saveLaundryDetails", data, { headers });
  }

  // REPORT
  getIncome(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + "displayincome", { headers });
  }

  totalPrice(transId: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "totalPrice/" + transId, { headers });
  }

  getCash(staffId: any): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + "getCash/" + staffId, { headers });
  }

  addRem(data: any): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + "addRem", data, { headers });
  }

  submitLaundryTrans(staffId:any, custId: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + "submitLaundryTrans/" + custId, staffId, { headers });
  }

  updateStatus(data: any, id: any, staffID: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const request = {...data, staffID};
    return this.http.post(this.apiUrl + "updateStatus/" + id, request, { headers });
  }

  doneTransac(id:any): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl + "doneTransac/" + id, { headers });
  }
}
