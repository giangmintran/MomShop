import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCartService } from 'src/services/cartService.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  baseUrl = 'http://localhost:5001';
  products: any[] = null;
  value = '';
 // user;

  constructor(
    private router: Router,
    private cartService: UserCartService,
    public toastr: ToastrService) { }

  ngOnInit() {
   // this.user = JSON.parse(localStorage.getItem('user'));
    this.getProducts();
  }

  getProducts(){
    this.cartService.getAllCart().subscribe((res) => {
      this.products = res;
    })

  }
  plusQuantity(param){
    param.quantity++;
  }

  minusQuantity(param){
    param.quantity--;
    if(param.quantity < 0 ) param.quantity = 0;
  }

  delete(param){
    this.products = this.products.filter(e => e.id != param.id);
    this.cartService.deleteCart(param.id).subscribe();
  }

  checkout(){
    this.router.navigateByUrl('/check-out');
  }
}