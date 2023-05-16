import { Component } from '@angular/core';
import { Order } from 'src/models/order';
import { OrderFilter } from 'src/models/orderFilter';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-app-user-order',
  templateUrl: './app-user-order.component.html',
  styleUrls: ['./app-user-order.component.scss']
})
export class AppUserOrderComponent {
    dataOrder;
    filterOrder: OrderFilter
    constructor(private orderService:OrderService){
        this.orderService.getAllOrder(this.filterOrder).subscribe(result=>{
          this.dataOrder = result;
        })
    }
}
