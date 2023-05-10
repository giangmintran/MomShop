import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {
baseUrl = 'http://localhost:5001/api/product/';
  constructor(private http: HttpClient) {}

  getShirt(shirtName:string, status?): Observable<any> {
    return this.http.get(this.baseUrl + shirtName +'?status=' + status);
  } 
}