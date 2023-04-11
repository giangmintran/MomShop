import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-app-admin-management-user',
  templateUrl: './app-admin-management-user.component.html',
  styleUrls: ['./app-admin-management-user.component.scss'],
})
export class AppAdminManagementUserComponent implements OnInit {
  @ViewChild('createUser', { static: true })
  modalUser: CreateOrEditUserComponent;
  product: Product;
  cols;
  tableData;
  selectedRow;
  totalRecords;
  ngOnInit(): void {}
  constructor(private http: HttpClient,public productServices : ProductService,public toastr: ToastrService) {
    this.cols = [
      {
        field: 'id',
        header: '#Id',
      },
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'category',
        header: 'Category',
      },
      {
        field: 'quantity',
        header: 'Quantity',
      },
    ];
    this.getProductData();
  }
  getProductData(): void {
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
      this.toastr.success('Xoá thành công','Thông báo',{timeOut: 1000});
      this.productServices.getAllProduct().subscribe(()=>{
        this.getProductData();
      })
    });
  }
}
