import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditUserComponent } from '../app-admin-management-user/create-or-edit-user/create-or-edit-user.component';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';

@Component({
  selector: 'app-app-admin-mangement-customer',
  templateUrl: './app-admin-mangement-customer.component.html',
  styleUrls: ['./app-admin-mangement-customer.component.scss']
})
export class AppAdminMangementCustomerComponent {
  @ViewChild('createCustomer', { static: true })
  modalUser: CreateOrEditCustomerComponent;
  product: Product;
  //filter
  name;
  phone;
  email
  cols;
  tableData;
  filter: boolean = false
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
        field: 'STT',
        header: 'Id',
      },
      {
        field: 'nameCustomer',
        header: 'Tên khách hàng',
      },
      {
        field: 'email',
        header: 'Email',
      },
      {
        field: 'phone',
        header: 'SDT',
      },
      {
        field: 'address',
        header: 'Địa chỉ',
      },
      {
        field: 'accumulatePoint',
        header: 'Điểm tích lũy',
      },
    ];
    this.getAllCustomer();
  }
  getAllCustomer(): void {
    this.productServices.getAllProduct().subscribe((data)=>{
      this.tableData = data;
      this.totalRecords = this.tableData.l
    });
  }
  onSelectionChange(event) {}
  createUsers() {
    this.modalUser.show();
  }
  editUser() {
    this.modalUser.show(this.selectedRow.id);
  }
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
