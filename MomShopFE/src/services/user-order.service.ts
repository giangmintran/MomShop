import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  baseUrl = 'http://localhost:5001/api/user/order/';
  constructor(private http: HttpClient) { }

  addOrder(input: any) {
    return this.http.post(this.baseUrl + 'add', input)
  }
  getAllOrder(filter) {
    return this.http.get(this.baseUrl + 'get', filter)
  }
}