import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { AppAdminViewDetailProductComponent } from './app-admin-view-detail-product/app-admin-view-detail-product.component';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';

@Component({
  selector: 'app-app-admin-management-product',
  templateUrl: './app-admin-management-product.component.html',
  styleUrls: ['./app-admin-management-product.component.scss']
})
export class AppAdminManagementProductComponent {
  //@ViewChild('createUser', { static: true })
  //modalUser: CreateOrEditProductComponent;
  @ViewChild('viewDetail', { static: true }) viewDetail : AppAdminViewDetailProductComponent
  @ViewChild('createOrEdit', { static: true }) modalCreateOrEdit : CreateOrEditProductComponent
  rows: any[] = [];
  product: Product;
  cols;
  filter
  filterStatus = null;
  tableData: any;
  selectedProduct;
  selectedDetailProduct
  totalRecords;
  status = undefined;
  listStatus = [
    {code :'Tất cả',value:undefined},
    {code :'1',value:1},
    {code :'2',value:2},
    {code :'3',value:3},
  ]
  ngOnInit(): void {}
  constructor(private http: HttpClient,public productServices : ProductService,public toastr: ToastrService) {
    this.cols = [
      {
        field: 'id',
        header: 'STT',
      },
      {
        field: 'code',
        header: 'Mã sản phẩm',
      },
      {
        field: 'name',
        header: 'Tên sản phẩm',
      },
      {
        field: 'productType',
        header: 'Loại sản phẩm',
      },
      {
        field: 'price',
        header: 'Giá bán',
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
    this.getProductData();
  }
  getProductData(): void {
    this.productServices.getAllProduct(this.filterStatus).subscribe((data) => {
      this.rows = data?.items;
      console.log(this.tableData);
      this.selectedProduct = undefined
    });
  }
  onSelectionChange(event) {}
  createUsers() {
    this.modalCreateOrEdit.show();
  }
  editUser(row) {
    this.modalCreateOrEdit.show(row.id);
  }
  deleteUser(row) {
    this.productServices.deleteProduct(row.id).subscribe((data)=>{
      this.toastr.success('Xoá thành công','Thông báo',{timeOut: 1000});
      this.productServices.getAllProduct().subscribe(()=>{
        this.getProductData();
      })
    });
  }
  viewDetailProduct(data){
    console.log("abc",data);
    this.viewDetail.show(data.id);
  }
  onFilterChange(){
    this.filter = !this.filter;
  }
}
