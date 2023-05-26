import { Component, ViewChild } from "@angular/core";
import { FilterOrderDto } from "src/models/orderFilter";
import { UserOrderService } from "src/services/user-order.service";
import { AppUserVoteComponent } from "./app-user-vote/app-user-vote.component";
import { AppUserOrderDeliveryComponent } from "./app-user-order-delivery/app-user-order-delivery.component";

@Component({
  selector: "app-app-user-order",
  templateUrl: "./app-user-order.component.html",
  styleUrls: ["./app-user-order.component.scss"],
})
export class AppUserOrderComponent {
  @ViewChild("userVote", { static: true }) modalVote: AppUserVoteComponent;
  @ViewChild("userstatusOrder", { static: true }) modalStatus: AppUserOrderDeliveryComponent;

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
      label: "Đã giao",
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
      this.dataOrder.forEach(ele => {
        ele.statusName = this.listStatus.find(e => e.value == ele.orderStatus).label;
      })
      console.log(this.dataOrder);
    });
  }
  openModalVote(order) {
    this.modalVote.show(order);
  }
  openModalStatusOrder() {
    this.modalStatus.show()
  }
}
