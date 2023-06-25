import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CustomerService } from 'src/services/cusomter.service';
import { CustomerConst } from 'src/shared/AppConst';

@Component({
  selector: 'app-app-admin-mangement-customer',
  templateUrl: './app-admin-mangement-customer.component.html',
  styleUrls: ['./app-admin-mangement-customer.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe]
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
  listStatus;
  filterStatus;
  keyword;
  CustomerConst = CustomerConst;
  ngOnInit(): void {}
  constructor(private http: HttpClient,public customerServices : CustomerService,public toastr: ToastrService) {
    this.cols = [
      // {
      //   field: 'id',
      //   header: '#Id',
      // },
      {
        field: 'fullName',
        header: 'Họ tên',
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
        field: 'birthDay',
        header: 'Ngày sinh',
      },
      {
        field: 'address',
        header: 'Họ tên',
      },
    ];
    this.getAllCustomer();
  }
  getAllCustomer(): void {
    this.customerServices.getAllCustomer().subscribe((data)=>{
      console.log("dataCustomer", data);
      
      this.tableData = data;
    });
  }

  startTimer(){

  }
  onSelectionChange(event) {}
  createUsers() {
    this.modalUser.show();
  }
  editUser() {
    this.modalUser.show(this.selectedRow.id);
  }
  onFilterChange(){
    this.filter = !this.filter;
  }
}
