import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ReceiveOrderDto } from "src/models/receiverOrder";
import { ReceiveOrder } from "src/services/receiveOrder.service";
import * as moment from 'moment';
@Component({
  selector: "app-creat-or-edit-import-product",
  templateUrl: "./creat-or-edit-import-product.component.html",
  styleUrls: ["./creat-or-edit-import-product.component.scss"],
})
export class CreatOrEditImportProductComponent {
  receiveOrder: ReceiveOrderDto = new ReceiveOrderDto();
  saving = false;
  active;
  cities;
  name: string;
  test;
  listStatus;
  listTypeProduct;
  category;
  quantity;
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public receiveOrders: ReceiveOrder,
    public toastr: ToastrService
  ) {
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    this.listStatus = [
      { code: 'Chưa thanh toán', value: 1 },
      { code: 'Đã thanh toán', value: 2 },
      { code: 'Đã hoàn thành', value: 3 },
    ]
  }
  show(id?) {
    if (id) {
      this.receiveOrders.getReceiveOrderById(id).subscribe((data) => {
        this.receiveOrder = data;
        this.receiveOrder .receivedDate = moment( this.receiveOrder .receivedDate).format('DD/MM/YYYY')
        this.receiveOrder.id = id;
      })
    }
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.modal.hide();
  }
  save() {
    //this.receiveOrder.receivedDate = moment( this.receiveOrder.receivedDate).format('DD/MM/YYYY')
    this.receiveOrders.createOrEditReceiveOrder(this.receiveOrder).subscribe(() => {
      this.active = false;
      this.toastr.success("Thêm thành công", "Toartr fun!");
      this.modalSave.emit(null);
      this.close();
    });
  }
}
