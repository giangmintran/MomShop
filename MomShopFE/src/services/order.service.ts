import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgModel } from "@angular/forms";

@Injectable({
    providedIn: 'root',
  })
  export class OrderService{
    baseUrl = 'http://localhost:5001    /api/order/';
    constructor(private http: HttpClient) {}
    getAllOrder() {
      return this.http.get(this.baseUrl + 'find-all');
    }
  }