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
  first: number = 0;

  rows: number = 2;
  total: number;
  page = 0;
  customerId;
  baseUrl = "http://localhost:5001";
  dataOrder;
  dataOrderPagination;
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
      this.total = this.dataOrder.length;
      this.dataOrderPagination = this.dataOrder;
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
  cancelOrder(id) {
    console.log(id);
    
    this.userOrder.cancelOrder(id).subscribe(() => {
      console.log("done");
      this.toastr.success("Huỷ đơn hàng thành công", "Thông báo", {
        timeOut: 2000,
      });
      this.loadData();
    });
  }
  onPageChange(event) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.dataOrderPagination = this.dataOrder.slice(this.first, (this.page + 1) * this.rows);
  }
}
