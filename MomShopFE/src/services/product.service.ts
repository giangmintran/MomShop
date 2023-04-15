import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:5001/api/product/';
  constructor(private http: HttpClient) {}
  getAllProduct(status?): Observable<any> {
    if(status == undefined){
    return this.http.get(this.baseUrl + 'find-all');
    }
    return this.http.get(this.baseUrl + 'find-all' +'?status=' + status);
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
  detailProduct(id:number): Observable<any>{
    return this.http.get(this.baseUrl + 'detail/' + id);
  }
  addDetailProduct(product:any){
    return this.http.post(this.baseUrl+ 'add-detail',product)
  }
  updateDetailProduct(product:any){
    return this.http.put(this.baseUrl+ 'add-detail',product)
  }
  deleteDetailProduct(productDetailId:number) {
    return this.http.get(this.baseUrl + 'delete-detail/' + productDetailId);
  }
  getAllViewDetailProduct(productDetailId:number) {
    return this.http.get(this.baseUrl + 'product-detail/' + productDetailId);
  }
}
