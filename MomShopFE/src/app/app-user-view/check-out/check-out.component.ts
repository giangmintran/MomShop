import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCartService } from 'src/services/cartService.service';
import { UserOrderService } from 'src/services/user-order.service';
import { UserService } from 'src/services/user.service';
import { DiscountService } from 'src/services/discount.service';
import { UserDto } from 'src/models/user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  delivery = 'delivery';
  data;
  saleOffs: string = '';
  payOption = "cod";
  user;
  totalPrice: number; // tổng tiền chưa bao gồm mã giảm phí ship
  totalAmount: number = 0;
  products: any[] = [];
  baseUrl = 'http://localhost:5001';
  discount = 0;
  userInfo: UserDto = new UserDto();
  constructor(private http: HttpClient, private router: Router,private cartService: UserCartService,
    private userService: UserService,public toastr: ToastrService,
    private userOrderService: UserOrderService,
    private discountService: DiscountService) {
    this.http.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province").subscribe(data => {
      console.log(data);
    });

    this.getProducts();
    this.getUserInfo();
  }

  getProducts(){
    this.cartService.getAllCart().pipe(finalize(() => {
      this.calSumPrice();
    })).subscribe((res) => {
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
    this.userService.findUser().subscribe((res:any) => {
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
     // button.setAttribute('disabled', 'false');
    }
    else {
      button.style.backgroundColor = "#c8c8c8";
     // button.setAttribute('enabled', 'enabled');
    }
    if(this.discount > 0){
      this.toastr.warning('Mã giảm giá bị hủy!');
      this.discount = 0 ;
      this.calSumPrice();
    }
  }

  useDisCount(){
    this.discountService.applyDiscount(this.saleOffs).subscribe((res:any) => {
      if(res == 0) {
        this.toastr.warning('Mã không hợp lệ');
        this.discount = 0;
      }
      else if(this.saleOffs == '1'){
        this.toastr.success('Áp dụng mã thành công');
        this.discount = res;
      }
      this.calSumPrice();
    })
  }

  calSumPrice(){
    this.totalAmount = this.totalPrice + 30000 - this.totalPrice*this.discount/100;
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
      "discountCode": this.saleOffs,
      "totalAmount": this.totalAmount,
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
