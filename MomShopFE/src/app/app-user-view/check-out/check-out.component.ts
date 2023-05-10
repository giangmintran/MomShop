import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  data;
  saleOffs: string;
  constructor(private http: HttpClient, private router: Router) {
    this.http.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province").subscribe(data => {
      console.log(data);
    })
  }
  login() {
    this.router.navigateByUrl('/login')
  }
  saleOff() {
    var button = document.querySelector<HTMLElement>(".buttton-use");
    var input = document.querySelector<HTMLElement>(".input-sale-off");
    if (this.saleOffs.trim() !== "") {
      button.style.backgroundColor = "#338dbc";
      button.setAttribute('disabled', 'false');
    }
    else{
      button.style.backgroundColor = "#c8c8c8";
      button.setAttribute('disabled', 'true');
    }
  }
}
