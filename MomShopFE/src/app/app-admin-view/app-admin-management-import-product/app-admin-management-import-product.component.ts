import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';
import { CreateOrEditDetailImportProductComponent } from './create-or-edit-detail-import-product/create-or-edit-detail-import-product.component';
import { ReceiveOrder } from 'src/services/receiveOrder.service';
import * as moment from 'moment';
import { ReceiveOrderDto } from 'src/models/receiverOrder';

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
  receiveOrderData: ReceiveOrderDto[] = [];
  selectedRow;
  totalRecords;
  listStatus = [
    { code: 'Tất cả', value: undefined },
    { code: 'Đang bán', value: 1 },
    { code: 'Chưa mở bán', value: 2 },
    { code: 'Khoá', value: 3 },
  ]
  ngOnInit(): void { }
  constructor(private http: HttpClient, public receiveOrder: ReceiveOrder, public toastr: ToastrService) {
    this.cols = [
      {
        field: 'code',
        header: 'Mã sản phẩm',
      },
      {
        field: 'supplier',
        header: 'Nhà cung cấp',
      },
      {
        field: 'receiver',
        header: 'Người tiếp nhận',
      },
      {
        field: 'description',
        header: 'Mô tả',
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
        field: 'statusName',
        header: 'Trạng thái',
      },
    ];
    this.getReceiveOrderData();
  }
  getReceiveOrderData(): void {
    this.receiveOrder.getAllReceiveOrder().subscribe((data) => {
      data.forEach(element => {
        element.receivedDate = moment(element.receivedDate).format('DD/MM/YYYY')
        element.createdDate = moment(element.createdDate).format('DD/MM/YYYY')
        this.listStatus.forEach((e) => {
          if (e.value == element.status) {
            element.statusName == e.code;
          }
        }
        )
      });
      this.receiveOrderData = data;
    });
  }
  getReceiveOrderDetailData(): void {
    this.receiveOrder.getDetailReceiveOrderById(this.selectedRow.id).subscribe((data) => {
      this.receiveOrderDetailData = data;
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
      this.toastr.success('Xoá thành công', 'Thông báo', { timeOut: 3000 });
        this.getReceiveOrderData();
    });
  }
  //add Detail ReceiveOrder
  addDetailReceiveOrder() {
    this.modalDetailProductImport.show(this.selectedRow.id)
  }
}
