import { Component } from "@angular/core";
import { FilterOrderDto } from "src/models/orderFilter";
import { ViewOrderDto } from "src/models/user/viewOrderDto";
import { OrderService } from "src/services/order.service";
import { UserOrderService } from "src/services/user-order.service";

@Component({
  selector: "app-app-user-order",
  templateUrl: "./app-user-order.component.html",
  styleUrls: ["./app-user-order.component.scss"],
})
export class AppUserOrderComponent {
  baseUrl = "http://localhost:5001";
  dataOrder;
  statusName;
  listStatus = [
    {
      value: 1,
      label: "Khởi tạo",
    },
    {
      value: 2,
      label: "Đang giao",
    },
    {
      value: 3,
      label: "Đã giao thành công",
    },
    {
      value: 4,
      label: "Đã huỷ",
    },
  ];
  filterOrder: FilterOrderDto = new FilterOrderDto();
  constructor(private userOrder: UserOrderService) {
    this.filterOrder.customerId = 1;
    this.userOrder.getAllOrder(this.filterOrder).subscribe((result) => {
      this.dataOrder = result;
      this.dataOrder.forEach(ele=>{
        ele.statusName = this.listStatus.find(e=>e.value == ele.orderStatus).label;
      })
      console.log(this.dataOrder);
    });
  }
}
