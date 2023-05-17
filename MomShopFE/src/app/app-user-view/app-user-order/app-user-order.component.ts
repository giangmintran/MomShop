import { Component } from '@angular/core';
import { OrderFilter } from 'src/models/orderFilter';
import { ViewOrderDto } from 'src/models/user/viewOrderDto';
import { OrderService } from 'src/services/order.service';
import { UserOrderService } from 'src/services/user-order.service';

@Component({
  selector: 'app-app-user-order',
  templateUrl: './app-user-order.component.html',
  styleUrls: ['./app-user-order.component.scss']
})
export class AppUserOrderComponent {
  dataOrder;
  filterOrder: OrderFilter = new OrderFilter;
  constructor(private userOrder: UserOrderService) {
    this.filterOrder.customerId = 1;
    this.userOrder.getAllOrder(this.filterOrder).subscribe(result => {
      this.dataOrder = result;
    })
  }
}
