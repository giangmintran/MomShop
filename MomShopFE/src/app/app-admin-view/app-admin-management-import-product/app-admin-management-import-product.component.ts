import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { CreateOrEditProductComponent } from '../app-admin-management-product/create-or-edit-product/create-or-edit-product.component';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';

@Component({
  selector: 'app-app-admin-management-import-product',
  templateUrl: './app-admin-management-import-product.component.html',
  styleUrls: ['./app-admin-management-import-product.component.scss']
})
export class AppAdminManagementImportProductComponent {
  @ViewChild('createUser', { static: true })
  modalUser: CreatOrEditImportProductComponent;
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
