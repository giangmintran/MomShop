import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  data;
  constructor(private http:HttpClient) {
    this.http.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province").subscribe(data=>{
          console.log(data);
    })
  }
}
