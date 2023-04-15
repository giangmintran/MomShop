import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgModel } from "@angular/forms";

@Injectable({
    providedIn: 'root',
  })
  export class OrderService{
<<<<<<< Updated upstream
    baseUrl = 'http://localhost:5001    /api/order/';
=======
    baseUrl = 'https://localhost:5001/api/order/';
>>>>>>> Stashed changes
    constructor(private http: HttpClient) {}
    getAllOrder() {
      return this.http.get(this.baseUrl + 'find-all');
    }
  }