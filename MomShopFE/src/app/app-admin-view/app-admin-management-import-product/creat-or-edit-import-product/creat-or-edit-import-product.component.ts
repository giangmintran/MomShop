import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ConfirmEventType, ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ReceiveOrderDto } from "src/models/receiverOrder";
import { ReceiveOrderService } from "src/services/receiveOrder.service";
import { ProductConst, ProductStatus, ReceivedOrderConst } from "src/shared/AppConst";
import { CreateOrEditDetailImportProductComponent } from "../create-or-edit-detail-import-product/create-or-edit-detail-import-product.component";
import { ReceivedOrderDetail } from "src/models/receivedOrderDetail";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-creat-or-edit-import-product",
  templateUrl: "./creat-or-edit-import-product.component.html",
  styleUrls: ["./creat-or-edit-import-product.component.scss"],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class CreatOrEditImportProductComponent implements OnInit {
  receiveOrder: ReceiveOrderDto = new ReceiveOrderDto();
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
  receivedOrderDetails: any = [];
  ProductStatus = ProductStatus;
  ref: DynamicDialogRef
  types = ProductConst.productType;
  
  constructor(
    public messageService: MessageService,  
    public receivedOrderService: ReceiveOrderService,
    public toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService, 
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
    this.getData();
  }

  getData(){
    //   this.receivedOrderService.getReceiveOrderById(this.configDialog?.data.receivedOrder.id).subscribe((data) => {
    //     console.log("edit", data);
    //     this.receiveOrder = data;
    //     this.receiveOrder.createdDate = this.configDialog?.data.receivedOrder.createdDateDisplay;
    //     this.receiveOrder.receivedDate = this.configDialog?.data.receivedOrder.receivedDateDisplay;
    //     if(this.receiveOrder.details){
    //       this.showData(this.receiveOrder.details)
    //       this.genlistAction(this.receiveOrder.details);
    //     }
    //   }); 
  }

  showData(rows){
    for(let row of rows){
        row.typeDisplay = ProductStatus.getProductType(row.type)
    }
  }

  show(id?) {
    if (id) {
      this.receivedOrderService.getReceiveOrderById(id).subscribe((data) => {
        this.receiveOrder = data;
        this.receiveOrder.id = id;
      })
    }
  }
  close() {
  }

  save() {
    if(this.validate()){
      let receivedDate = this.receiveOrder.receivedDate.getDate() + 1;
      this.receiveOrder.receivedDate.setDate(receivedDate);
      console.log("order", this.receiveOrder);
      console.log("detaal", this.receivedOrderDetails);
      this.receiveOrder.details = this.receivedOrderDetails;
      console.log("resilt", this.receiveOrder);
      // this.receivedOrderService.createOrEditReceiveOrder(this.receiveOrder).subscribe(() => {
      // });
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
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
            this.editDetail($event.item.data);
          },
        });
        //
        actions.push({
          data: detail,
          index: index,
          label: "Xoá",
          icon: "pi pi-trash",
          command: ($event) => {
            this.deleteDetail($event.item.data);
          },
        });
      return actions;
    });
  }

  backToCollectionList(){
    this.router.navigate(['admin/received-order/order']);
  }
  addvalue() {
    this.receivedOrderDetails.push({ });
  }
  removeDetail(index){
    this.confirmationService.confirm({
      message: 'Xóa giá trị này?',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.receivedOrderDetails.splice(index, 1);
      }
    });
  }
  createDetail(){
    this.ref = this.dialogService.open(CreateOrEditDetailImportProductComponent, {
      data: {
        receivedOrderId: this.receiveOrder.id
      },
      header: 'Thêm mới',
      width: '70%',
      height: '70%',
      contentStyle: { "max-height": "1900px", overflow: "auto", "margin-bottom": "40px" },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        this.getData();
      }
    });
  }

  editDetail(row){
    // const ref = this.dialogService.open(CreateOrEditDetailImportProductComponent, {
    //   header: "Cập nhật thông tin",
    //   width: "50%",
    //   height: "50%",
    //   contentStyle: { "max-height": "800px", overflow: "auto", "margin-bottom": "40px", },
    //   baseZIndex: 10000,
    //   data: {
    //     receivedOrder: row,
    //   },
    // });
    // //
    // ref.onClose.subscribe((data) => {
    //   if (data){
    //     this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
    //     this.getData();
    //   }
    // });
  }

  deleteDetail(row){
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.receivedOrderService.deleteDetailReceiveOrder(row.id).subscribe((data)=>{
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công', life: 3000 });
            this.getData();
    });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
              case ConfirmEventType.CANCEL:
                  break;
          }
      }
    });
  }
}
