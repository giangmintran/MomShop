import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';

@Component({
  selector: 'app-app-admin-management-product',
  templateUrl: './app-admin-management-product.component.html',
  styleUrls: ['./app-admin-management-product.component.scss']
})
export class AppAdminManagementProductComponent {
  @ViewChild('createUser', { static: true })
  modalUser: CreateOrEditProductComponent;
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
    this.productServices.getAllProduct().subscribe((data) => {
      this.tableData = data;
      this.selectedRow = undefined
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
