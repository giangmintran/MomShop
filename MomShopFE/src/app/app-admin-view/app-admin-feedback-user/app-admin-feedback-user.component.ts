import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
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
  product: ProductDto = new ProductDto;
  //filter
  orderCode;
  pointEvaluate;
  selectedCity;
  listPoint;
  //---
  cols;
  tableData;
  filter: boolean = true
  selectedRow;
  totalRecords;
  ngOnInit(): void {}
  constructor(private http: HttpClient,public productServices : ProductService,public toastr: ToastrService) {
    this.cols = [
      {
        field: 'orderCode',
        header: 'Mã đơn hàng',
      },
      {
        field: 'customerName',
        header: 'Mã khách hàng',
      },
      {
        field: 'productName',
        header: 'Tên sản phẩm',
      },
      {
        field: 'content',
        header: 'Phản hồi',
      },
      {
        field: 'email',
        header: 'Email',
      },
      {
        field: 'createdDate',
        header: 'Ngày tạo',
      },
      {
        field: 'pointEvaluate',
        header: 'Số sao đánh giá',
      },
    ];
    this.listPoint = [
      {name: '1 sao ', code: '1'},
      {name: '2 sao', code: '2'},
      {name: '3 sap', code: '3'},
      {name: '4 sao', code: '4'},
      {name: '5 sao', code: '5'}
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
