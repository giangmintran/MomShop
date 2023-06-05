import { Component, ViewChild } from "@angular/core";
import { FilterOrderDto } from "src/models/orderFilter";
import { UserOrderService } from "src/services/user-order.service";
import { AppUserVoteComponent } from "./app-user-vote/app-user-vote.component";
import { AppUserOrderDeliveryComponent } from "./app-user-order-delivery/app-user-order-delivery.component";
import { OrderService } from "src/services/order.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-app-user-order",
  templateUrl: "./app-user-order.component.html",
  styleUrls: ["./app-user-order.component.scss"],
})
export class AppUserOrderComponent {
  @ViewChild("userVote", { static: true }) modalVote: AppUserVoteComponent;
  @ViewChild("userstatusOrder", { static: true })
  modalStatus: AppUserOrderDeliveryComponent;

  customerId;
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
      label: "Đã nhận",
    },
    {
      value: 3,
      label: "Đã giao",
    },
    {
      value: 4,
      label: "Hoàn thành",
    },
    {
      value: 5,
      label: "Đã huỷ",
    },
  ];
  filterOrder: FilterOrderDto = new FilterOrderDto();
  constructor(
    private userOrder: UserOrderService,
    private order: OrderService,
    private toastr: ToastrService
  ) {
    this.customerId = JSON.parse(localStorage.getItem("user")).id;
    this.loadData();
  }
  loadData() {
    this.userOrder.getAllOrder(this.customerId).subscribe((result) => {
      this.dataOrder = result;
      this.dataOrder.forEach((ele) => {
        ele.statusName = this.listStatus.find(
          (e) => e.value == ele.orderStatus
        ).label;
      });
      console.log(this.dataOrder);
    });
  }
  openModalVote(order) {
    this.modalVote.show(order);
  }
  openModalStatusOrder() {
    this.modalStatus.show();
  }
  cancelOrder() {
    this.order.cancelOrder(this.dataOrder.id).subscribe(() => {
      this.toastr.success("Huỷ đơn hàng thành công", "Thông báo", {
        timeOut: 2000,
      });
      this.loadData();
    });
  }
}
