import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = "http://rc.grodok.com";

  constructor(private httpClient: HttpClient) { }

  getTable(tableName){
    return this.httpClient.post(environment.baseUrl + tableName + '/get', {})
  }

  // getFileListFromFolder(){
  //   this.googlePlus.login({})
  // .then(res => console.log(res))
  // .catch(err => console.error(err));
  // }
}
