import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgModel } from "@angular/forms";
import { ServiceBase } from "./service-base";

@Injectable({
    providedIn: 'root',
  })
  export class OrderService extends ServiceBase{
    baseUrl = 'http://localhost:5001/api/order/';
    constructor(private http: HttpClient) {
      super();
    }
    getAllOrder() {
      return this.http.get(this.baseUrl + 'find-all');
    }

    get(id) {
      return this.http.get(this.baseUrl + 'detail/' + id);
    }

    acceptOrder(id) {
      return this.http.put(this.baseUrl + 'accept-order/' + id, null);
    }
    processOrder(id) {
      return this.http.put(this.baseUrl + 'process-order/' + id, null);
    }

    completeOrder(id) {
      return this.http.put(this.baseUrl + 'complete-order/' + id,null);
    }

    cancelOrder(id) {
      console.log("service id", id);
      
      return this.http.put(this.baseUrl + 'cancel-order/' + id, null);
    }
  }