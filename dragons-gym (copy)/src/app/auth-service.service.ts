import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl:string = "http://rc.grodok.com";

  constructor(private httpClient: HttpClient) { }

  login(form){
    return this.httpClient.post(this.baseUrl+"/api/_auth/login_pass", form);
  }

  register(form): Observable<any>{
    return this.httpClient.post("http://127.0.0.1:3000/customers", form);
  }
}
