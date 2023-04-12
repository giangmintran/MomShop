import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditCustomerComponent } from '../app-admin-mangement-customer/create-or-edit-customer/create-or-edit-customer.component';

@Component({
  selector: 'app-app-admin-feedback-user',
  templateUrl: './app-admin-feedback-user.component.html',
  styleUrls: ['./app-admin-feedback-user.component.scss']
})
export class AppAdminFeedbackUserComponent implements OnInit {
  @ViewChild('createCustomer', { static: true })
  modalUser: CreateOrEditCustomerComponent;
  product: Product;
  //filter
  orderCode;
  pointEvaluate;
  //---
  cols;
  tableData;
  filter: boolean = true
  selectedRow;
  totalRecords;
  ngOnInit(): void {}
  constructor(private http: HttpClient,public productServices : ProductService,public toastr: ToastrService) {
    this.cols = [
      // {
      //   field: 'id',
      //   header: '#Id',
      // },
      {
        field: 'id',
        header: 'STT',
      },
      {
        field: 'orderCode',
        header: 'Mã đơn hàng',
      },
      {
        field: 'customerName',
        header: 'Tên khách hàng',
      },
      {
        field: 'productName',
        header: 'Tên sản phẩm',
      },
      {
        field: 'address',
        header: 'Phản hồi',
      },
      {
        field: 'pointEvaluate',
        header: 'Số sao đánh giá',
      },
    ];
    this.getAllCustomer();
  }
  getAllCustomer(): void {
    this.productServices.getAllProduct().subscribe((data)=>{
      this.tableData = data;
      this.totalRecords = this.tableData
    });
  }
  onSelectionChange(event) {}
  // createUsers() {
  //   this.modalUser.show();
  // }
  // editUser() {
  //   this.modalUser.show(this.selectedRow.id);
  // }
  deleteUser() {
    this.productServices.deleteProduct(this.selectedRow.id).subscribe((data)=>{
      this.productServices.getAllProduct().subscribe(()=>{
        this.toastr.success('Xoá thành công','Thông báo',{
          timeOut:100
        });
        this.getAllCustomer();
      })
    });
  }
  onFilterChange(){
    this.filter = !this.filter;
  }
}
