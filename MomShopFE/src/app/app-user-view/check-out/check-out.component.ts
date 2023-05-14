import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCartService } from 'src/services/cartService.service';
import { UserOrderService } from 'src/services/user-order.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  delivery = 'delivery';
  data;
  saleOffs: string;
  payOption = "cod";
  user;
  totalPrice: number;
  products: any[] = [];
  baseUrl = 'http://localhost:5001';
  discount = 0;
  userInfo;
  constructor(private http: HttpClient, private router: Router,private cartService: UserCartService,
    private userService: UserService,public toastr: ToastrService,
    private userOrderService: UserOrderService) {
    this.http.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province").subscribe(data => {
      console.log(data);
    });

    this.getProducts();
    this.getUserInfo();
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
  getUserInfo(){
    this.userService.findUser().subscribe((res) => {
      // console.log(res);
      this.userInfo = res;
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

  completeCheckOut(){
    const input = Object.assign({}, {
      "id": 0,
      "orderCode": "string",
      "customerName": this.userInfo?.fullName ?? "",
      "address": this.userInfo?.address ?? "",
      "province": "string",
      "district": "string",
      "nation": "Việt Nam",
      "email": this.userInfo?.email ?? "",
      "phone": this.userInfo?.phone ?? "",
      "createdDate": "2023-05-14T16:17:27.447Z",
      "intendedTime": "2023-05-14T16:17:27.447Z",
      "paymentType": this.payOption == "cod" ? 1 : this.payOption == "bank" ? 2 : 0,
      "orderStatus": 1,
      "deliveryCost": 30000,
      "discountCode": "string",
      "totalAmount": this.totalPrice + 30000 - this.discount,
      "description": "",
      "createdBy": this.userInfo?.id ?? 0,
      "orderDetails": []
    });

    if(this.products.length > 0){
      this.products.forEach(e => {
        input.orderDetails.push({
          "productId": e.productId,
          "size": e.size,
          "quantity": e.quantity
        })
      });
    }
    //console.log(input);
    this.userOrderService.addOrder(input).pipe(finalize(() => {
      this.router.navigateByUrl('/order');
    })).subscribe((res:any )=> {
      this.toastr.success(
        "Tạo đơn hàng "+ res.orderCode + " thành công!" ,
        "Thông báo",
        { timeOut: 3000 }
        );
    })
  }
}
