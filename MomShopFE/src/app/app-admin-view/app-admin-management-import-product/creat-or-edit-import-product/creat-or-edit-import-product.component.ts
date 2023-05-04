import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ReceiveOrderDto } from "src/models/receiverOrder";
import { ReceiveOrderService } from "src/services/receiveOrder.service";

@Component({
  selector: "app-creat-or-edit-import-product",
  templateUrl: "./creat-or-edit-import-product.component.html",
  styleUrls: ["./creat-or-edit-import-product.component.scss"],
})
export class CreatOrEditImportProductComponent implements OnInit {
  ref: DynamicDialogRef;
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
  constructor(
    public dialogService: DialogService, 
    public messageService: MessageService,  
   // public configDialog: DynamicDialogConfig,
    public receivedOrderService: ReceiveOrderService,
    public toastr: ToastrService,
    //public ref: DynamicDialogRef,
  ) {}
  ngOnInit(): void {
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    this.listStatus = [
      { code: 'Tất cả', value: undefined },
      { code: 'Chưa thanh toán', value: 1 },
      { code: 'Đã thanh toán', value: 2 },
      { code: 'Đã hoàn thành', value: 3 },
    ]
    //console.log("ầv", this.configDialog?.data);
  }
  show(id?) {
    if (id) {
      this.receivedOrderService.getReceiveOrderById(id).subscribe((data) => {
        this.receiveOrder = data;
        this.receiveOrder.id = id;
      })
    }
    //this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    //this.modal.hide();
  }
  save() {
    this.receivedOrderService.createOrEditReceiveOrder(this.receiveOrder).subscribe(() => {
      this.ref.close(true);
    });
  }
}
