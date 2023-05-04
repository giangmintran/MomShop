import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';
import { ReceiveOrderService } from 'src/services/receiveOrder.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-app-admin-management-import-product',
  templateUrl: './app-admin-management-import-product.component.html',
  styleUrls: ['./app-admin-management-import-product.component.scss'],
  providers: [DialogService,ConfirmationService, MessageService]
})
export class AppAdminManagementImportProductComponent implements OnInit{
  public ref: DynamicDialogRef;
  product: ProductDto = new ProductDto;
  cols;
  receiveOrderDetailData;
  receiveOrderData;
  selectedRow;
  totalRecords;
  constructor(private http: HttpClient, 
    public receiveOrder: ReceiveOrderService, 
    public toastr: ToastrService, 
    public dialogService: DialogService, 
    public messageService: MessageService,
    ) {
    this.cols = [
      {
        field: 'code',
        header: 'Mã hóa đơn',
      },
      {
        field: 'createdDate',
        header: 'Ngày tạo đơn hàng',
      },
      {
        field: 'receivedDate',
        header: 'Ngày nhận đơn hàng',
      },
      {
        field: 'supplier',
        header: 'Tên nhà cung cấp',
      },
      {
        field: 'receiver',
        header: 'Tên người nhận',
      },
      {
        field: 'description',
        header: 'Mô tả',
      },
      {
        field: 'status',
        header: 'Trạng thái',
      },
    ];
    this.getReceiveOrderData();
  }
  ngOnInit(): void {
  }
  getReceiveOrderData(): void {
    this.receiveOrder.getAllReceiveOrder().subscribe((data) => {
      this.receiveOrderData = data;
    });
  }
  getReceiveOrderDetailData(): void {
    this.receiveOrder.getDetailReceiveOrder(this.selectedRow.id).subscribe((data) => {
      this.receiveOrderDetailData = data;
    });
  }
  onSelectionChange(event) {
    this.getReceiveOrderDetailData();
  }
  createReceiveOrder() {
    this.ref = this.dialogService.open(CreatOrEditImportProductComponent, {
      data: {
        "id": 1234
      },
      header: 'Thêm mới',
      width: '70%',
      height: '90%',
      contentStyle: { "max-height": "1900px", overflow: "auto", "margin-bottom": "40px" },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((data) => {
      console.log("Data thêm", data);
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        window.location.reload();
      }
    });
  }
  editReceiveOrder() {
    //this.modalproductImport.show(this.selectedRow.id);
  }
  deleteReceiveOrder() {
    this.receiveOrder.deleteReceiveOrder(this.selectedRow.id).subscribe(() => {
      this.toastr.success('Xoá thành công', 'Thông báo', { timeOut: 3000 });
      this.getReceiveOrderData();
    });
  }
  //add Detail ReceiveOrder
  addDetailReceiveOrder() {
    //this.modalDetailProductImport.show(this.selectedRow.id)
  }
}
