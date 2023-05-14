import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  baseUrl = 'http://localhost:5001/api/collection/';
  constructor(private http: HttpClient) {}
  getAllCollection(status?): Observable<any> {
    if(status == undefined){
    return this.http.get(this.baseUrl + 'find-all');
    }
    return this.http.get(this.baseUrl + 'find-all' +'?status=' + status);
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
  getCollection(id) : Observable<any>{
    return this.http.get(this.baseUrl+ 'find/' + id)
  }
}
