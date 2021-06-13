import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  createTable(tableName, tableBody) {
    console.log(tableBody);
    console.log(tableName)
    this.httpClient.post(environment.basePath + tableName + '/delete?_confirmstr='+tableName, {}).subscribe(
      data=> {
        console.log(data)
        this.httpClient.post(environment.basePath + tableName + '/create?_confirmstr='+tableName, JSON.stringify(tableBody)).subscribe(
          data => {
              console.log(data)
          },
          err => {
            // this.error = true;
            console.log('Error: ' + err.error);
            console.log('Name: ' + err.name);
            console.log('Message: ' + err.message);
            console.log('Status: ' + err.status);
          });
      },
      err=> {

      }
    )
    
  }

  getTable(tableName){
    return this.httpClient.post(environment.basePath + tableName + '/get', {})
  }
}
