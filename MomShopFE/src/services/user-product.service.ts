import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from './service-base';

@Injectable({
  providedIn: 'root'
})
export class UserProductService extends ServiceBase {
baseUrl = 'http://localhost:5001/api/user/product/';
  constructor(private http: HttpClient) {
    super();
  }

  getShirt(shirtName:string, status?: number): Observable<any> {
    let url_ = this.baseUrl + shirtName;
    if (status != undefined){
      url_ = url_ + '?status=' + status;
    }
    return this.http.get(url_);
  } 
}