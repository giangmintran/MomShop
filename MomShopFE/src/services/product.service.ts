import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'https://localhost:44308/api/product/';
  constructor(private http: HttpClient) {}
  getAllProduct() {
    return this.http.get(this.baseUrl + 'find-all');
  }
  deleteProduct(id:number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
  createOrEdit(product: any) {
    if (product.id) {
      return this.http.put(this.baseUrl + 'update', product);
    } else {
      return this.http.post(this.baseUrl + 'add', product);
    }
  }
  detailProduct(id:number) {
    return this.http.get(this.baseUrl + 'detail/' + id);
  }
}
