import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceBase } from './service-base';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends ServiceBase{
  baseUrl = 'http://localhost:5001/api/user-account/';
  constructor(private http: HttpClient) {
    super();
  }

  getAllCustomer(status?: number, keyword: string = ""): Observable<any> {
    let url_ = this.baseUrl + `get-all?`;
    url_ += this.convertParamUrl('status', status ?? '');
    url_ += this.convertParamUrl("keyword", keyword);
    return this.http.get(url_);
  } 
  deleteCollection(id:number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
  createOrEdit(product: any) {
    if (product.id) {
      return this.http.put(this.baseUrl + 'update', product);
    } else {
      return this.http.post(this.baseUrl + 'add', product);
    }
  }
  getforEditCollection(id) : Observable<any>{
    return this.http.get(this.baseUrl+ 'detail/' + id)
  }
  getCollection(id, keyword: string = "") : Observable<any>{
    console.log("keyword", keyword);
    
    let url_ = this.baseUrl + `find/` + id + "?";
    url_ += this.convertParamUrl("keyword", keyword);
    return this.http.get(url_);
  }
}
