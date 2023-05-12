import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCartService } from 'src/services/cartService.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  delivery = 'delivery';
  data;
  saleOffs: string;
  payOption;
  user;
  totalPrice: number;
  products: any[] = [];
  baseUrl = 'http://localhost:5001';
  discount = 0;
  constructor(private http: HttpClient, private router: Router,private cartService: UserCartService) {
    this.http.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province").subscribe(data => {
      console.log(data);
    });

    this.getProducts();
  }

  getProducts(){
    this.cartService.getAllCart().subscribe((res) => {
      this.products = res;
      this.priceChange();
    })

  }

  priceChange(){
    this.totalPrice = 0;
    this.products.map(e => {
      this.totalPrice += (e.quantity*e.price);
    })
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    
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
