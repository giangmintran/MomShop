import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';
import { CreateOrEditDetailImportProductComponent } from './create-or-edit-detail-import-product/create-or-edit-detail-import-product.component';
import { ReceiveOrder } from 'src/services/receiveOrder.service';

@Component({
  selector: 'app-app-admin-management-import-product',
  templateUrl: './app-admin-management-import-product.component.html',
  styleUrls: ['./app-admin-management-import-product.component.scss']
})
export class AppAdminManagementImportProductComponent {
  @ViewChild('productImport', { static: true })
  modalproductImport: CreatOrEditImportProductComponent;
  @ViewChild('productDetailImport', { static: true })
  modalDetailProductImport: CreateOrEditDetailImportProductComponent;
  product: ProductDto = new ProductDto;
  cols;
  receiveOrderDetailData;
  receiveOrderData;
  selectedRow;
  totalRecords;
  ngOnInit(): void { }
  constructor(private http: HttpClient, public receiveOrder: ReceiveOrder, public toastr: ToastrService) {
    this.cols = [
      {
        field: 'code',
        header: 'Mã sản phẩm',
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
  getReceiveOrderData(): void {
    this.receiveOrder.getAllReceiveOrder().subscribe((data) => {
      this.receiveOrderData = data;
      //this.totalRecords = this.receiveOrderData
    });
  }
  getReceiveOrderDetailData(): void {
    this.receiveOrder.getDetailReceiveOrder(this.selectedRow.id).subscribe((data) => {
      this.receiveOrderDetailData = data;
      //this.totalRecords = this.receiveOrderData
    });
  }
  onSelectionChange(event) {
    this.getReceiveOrderDetailData();
   }
  createReceiveOrder() {
    this.modalproductImport.show();
  }
  editReceiveOrder() {
    this.modalproductImport.show(this.selectedRow.id);
  }
  deleteReceiveOrder() {
    this.receiveOrder.deleteReceiveOrder(this.selectedRow.id).subscribe(() => {
      this.toastr.success('Xoá thành công', 'Thông báo', { timeOut: 1000 });
        this.getReceiveOrderData();
    });
  }
  //add Detail ReceiveOrder
  addDetailReceiveOrder() {
    this.modalDetailProductImport.show(this.selectedRow.id)
  }
}
