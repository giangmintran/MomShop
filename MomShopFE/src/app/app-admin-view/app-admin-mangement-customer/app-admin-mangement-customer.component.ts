import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';

@Component({
  selector: 'app-app-admin-mangement-customer',
  templateUrl: './app-admin-mangement-customer.component.html',
  styleUrls: ['./app-admin-mangement-customer.component.scss']
})
export class AppAdminMangementCustomerComponent {
  @ViewChild('createCustomer', { static: true })
  modalUser: CreateOrEditCustomerComponent;
  product: ProductDto = new ProductDto;
  //filter
  name;
  phone;
  email
  cols;
  tableData;
  filter: boolean = true;
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
        field: 'firstName',
        header: 'Họ',
      },
      {
        field: 'lastName',
        header: 'Tên Đệm',
      },
      {
        field: 'email',
        header: 'Email',
      },
      {
        field: 'phone',
        header: 'SĐT',
      },
      {
        field: 'gender',
        header: 'Giới tính',
      },
      {
        field: 'birthDate',
        header: 'Ngày sinh',
      },
      {
        field: 'bankName',
        header: 'Tên ngân hàng',
      },
      {
        field: 'ankAccount',
        header: 'Tên ngân hàng',
      },
      // {
      //   field: 'accumulatePoint',
      //   header: 'Điểm tích lũy',
      // },
    ];
    this.getAllCustomer();
  }
  getAllCustomer(): void {
    this.productServices.getAllProduct(3).subscribe((data)=>{
      this.tableData = data;
      this.totalRecords = this.tableData
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
      this.productServices.getAllProduct(3, "").subscribe(()=>{
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
