import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { AppAdminViewDetailProductComponent } from './app-admin-view-detail-product/app-admin-view-detail-product.component';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';
import { CreateOrEditDetailProductComponent } from './create-or-edit-detail-product/create-or-edit-detail-product.component';

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
  @ViewChild('createOrEditDeatail', { static: true }) modalAddDetailProduct: CreateOrEditDetailProductComponent;

  rows: ProductDto[] = [];
  product: ProductDto;
  colsProduct;
  colsDetailProduct;
  filter = true;
  filterStatus = null;
  tableData: any;
  selectedProduct;
  selectedDetailProduct
  totalRecords;
  status = undefined;
  detailProduct :any;
  listTypeProduct = [
    { name: "Áo thun", value: 1 },
    { name: "Áo sơ mi", value: 2 },
    { name: "Áo khoác", value: 3 },
    { name: "Quần", value: 4 },
    { name: "Phụ kiện", value: 5 },
  ];
  listStatus = [
    {code :'Tất cả',value:undefined},
    {code :'Đang bán',value:1},
    {code :'Chưa mở bán',value:2},
    {code :'Khoá',value:3},
  ]
  ngOnInit(): void {}
  constructor(private http: HttpClient,public productServices : ProductService,public toastr: ToastrService) {
    this.colsProduct = [
      {
        field: 'code',
        header: 'Mã sản phẩm',
      },
      {
        field: 'name',
        header: 'Tên sản phẩm',
      },
      {
        field: 'productTypeName',
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
        field: 'productStatusName',
        header: 'Trạng thái',
      },
    ];
    this.colsDetailProduct = [
      {
        field: 'size',
        header: 'Kích thước',
      },
      {
        field: 'quantity',
        header: 'Số lượng',
      },
      {
        field: 'description',
        header: 'Mô tả',
      },
    ];
    this.getProductData();
    //this.selectedProduct.id = 1
    //this.getDetailProductData(1);
  }
  getProductData(): void {
    this.productServices.getAllProduct(this.filterStatus).subscribe((data) => {
      this.rows = data?.items;
      this.rows.forEach(element => {
        var productTypeName = this.listTypeProduct.find( e=> e.value == element.productType).name
        var productStatusName = this.listStatus.find( e=> e.value == element.status).code
        if(productTypeName)
        {
          element.productTypeName = productTypeName
        }
        if(productStatusName){
          element.productStatusName = productStatusName
        }
      });
      // this.rows.forEach(element => {
      //   var productType = this.colsProduct.find(e =>e.field == 'productType')
      //   this.rows[productType.field] = this.listStatus.find(e=>e.value == element.productType).code
      // });
      console.log(this.tableData);
      this.selectedProduct = undefined
    });
  }
  getDetailProductData():void {
    this.productServices.getAllViewDetailProduct(this.selectedProduct.id).subscribe((data)=>{
      this.detailProduct = data;
      console.log(this.detailProduct)
    })
  }
  onSelectionChange() {
   this.getDetailProductData();
  }
  createProduct() {
    this.modalCreateOrEdit.show();
  }
  editProduct(row) {
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
  addDetailProduct(row){
    this.modalAddDetailProduct.show(row.id,this.selectedProduct.code,this.selectedProduct.name)
  }
  editDetailProduct(row){
    this.modalAddDetailProduct.show(row.id,this.selectedProduct.code,this.selectedProduct.name)
  }
  deleteDetailProduct(row){
    this.productServices.deleteDetailProduct(row.id).subscribe(()=>{
      this.toastr.success('Xoá thành công','Thông báo',{timeOut: 1000});
      this.productServices.getAllProduct().subscribe(()=>{
        this.getDetailProductData();
      })
    });
  }
}
