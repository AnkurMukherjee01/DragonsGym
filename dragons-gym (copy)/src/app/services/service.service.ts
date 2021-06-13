import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient : HttpClient) { }

  postSendMailToken(email: string){
    return this.httpClient.post(environment.baseUrl+'auth2/mail_token', {"email":email,"template":"Hello thanks for register {token}"})
  }
}
