import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-collection-detail',
  templateUrl: './user-collection-detail.component.html',
  styleUrls: ['./user-collection-detail.component.scss']
})
export class UserCollectionDetailComponent {
  visible = false;

  product:any;
  value: number;
    
    productSize: any[] = [
        { size: 'XS', value: 1 },
        { size: 'S', value: 2 },
        { size: 'M', value: 3 },
        { size: 'L', value: 3 },
        { size: 'XL', value: 3 },
    ];

    constructor(private router: Router) { }

  plusQuantity(param){
    param.quantity++;
  }

  minusQuantity(param){
    param.quantity--;
    param.quantity =  param.quantity < 0 ? 0 : param.quantity;
  }

  addToCart(param){
    this.router.navigateByUrl('/cart');
  }

  showDialog() {
    this.visible = true;
}
}
