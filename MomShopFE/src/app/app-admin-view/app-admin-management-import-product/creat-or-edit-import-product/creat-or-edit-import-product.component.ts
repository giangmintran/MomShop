import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ReceiveOrderDto } from "src/models/receiverOrder";
import { ReceiveOrderService } from "src/services/receiveOrder.service";
import { ReceivedOrderConst } from "src/shared/AppConst";

@Component({
  selector: "app-creat-or-edit-import-product",
  templateUrl: "./creat-or-edit-import-product.component.html",
  styleUrls: ["./creat-or-edit-import-product.component.scss"],
})
export class CreatOrEditImportProductComponent implements OnInit {
  receiveOrder: ReceiveOrderDto = new ReceiveOrderDto();
  receiveOrder1: any;
  saving = false;
  active;
  cities;
  name: string;
  test;
  listStatus = ReceivedOrderConst.receiveStatus;
  listTypeProduct;
  category;
  quantity;
  selectedRow;
  colDetails;
  listAction: any[] = [];
  constructor(
    public dialogService: DialogService, 
    public messageService: MessageService,  
    public configDialog: DynamicDialogConfig,
    public receivedOrderService: ReceiveOrderService,
    public toastr: ToastrService,
    public ref: DynamicDialogRef,
  ) {}
  ngOnInit(): void {
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    this.colDetails = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    if(this.configDialog?.data.receivedOrder) {
      this.receivedOrderService.getReceiveOrderById(this.configDialog?.data.receivedOrder.id).subscribe((data) => {
        console.log("edit", data);
        this.receiveOrder = data;
        this.receiveOrder.createdDate = this.configDialog?.data.receivedOrder.createdDateDisplay;
        this.receiveOrder.receivedDate = this.configDialog?.data.receivedOrder.receivedDateDisplay;
        if(this.receiveOrder.details){
          this.genlistAction(this.receiveOrder.details);
        }
      });
    }
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
    this.ref.close(false);
  }

  save() {
    if(this.validate()){
      let receivedDate = this.receiveOrder.receivedDate.getDate() + 1;
      this.receiveOrder.receivedDate.setDate(receivedDate);

      console.log("date", this.receiveOrder.receivedDate);

      this.receivedOrderService.createOrEditReceiveOrder(this.receiveOrder).subscribe(() => {
        this.ref.close(true);
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng nhập đầy đủ thông tin', life: 3000 });
    }
  }

  validate(): boolean{
    console.log(this.receiveOrder);
    
    if(this.receiveOrder.code == null || this.receiveOrder.supplier == null || this.receiveOrder.status == null || this.receiveOrder.receiver == null){
      return false;
    }
    return true;
  }

  genlistAction(data = []) {
    this.listAction = data.map((detail, index) => {
      const actions = [];
        actions.push({
          data: detail,
          label: "Sửa",
          icon: "pi pi-pencil",
          command: ($event) => {
            console.log("$22222222222", detail);
            //this.editDetail(productDetail);
          },
        });
        //
        actions.push({
          data: detail,
          index: index,
          label: "Xoá",
          icon: "pi pi-trash",
          command: ($event) => {
            //this.detailProduct($event.item.data, $event.item.index);
          },
        });
      return actions;
    });
  }
}
