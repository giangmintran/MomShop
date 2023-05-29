import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = 'http://localhost:5001/api/dashboard';
  constructor(private http: HttpClient) {}
  dashboard() {
      return this.http.get(this.baseUrl);
  }
}
