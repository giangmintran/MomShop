import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { AppAdminViewDetailProductComponent } from './app-admin-view-detail-product/app-admin-view-detail-product.component';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';
import { CreateOrEditDetailProductComponent } from './create-or-edit-detail-product/create-or-edit-detail-product.component';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOrEditProductTestComponent } from './create-or-edit-product-test/create-or-edit-product-test.component';
import { Base } from 'src/shared/Base';
import { ProductStatus } from 'src/shared/AppConst';

@Component({
  selector: 'app-app-admin-management-product',
  templateUrl: './app-admin-management-product.component.html',
  styleUrls: ['./app-admin-management-product.component.scss'],
  providers: [DialogService,ConfirmationService, MessageService]
})
export class AppAdminManagementProductComponent{
  baseUrl = 'http://localhost:5001';
  ref: DynamicDialogRef;
  rows: ProductDto[] = [];
  rowsAfter: ProductDto[] = [];
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
  menuItems: MenuItem[] = [];
  listAction: any[] = [];
  screenHeight: number = window.innerHeight;
  metaKeySelection: boolean = true;
  ProductStatus = ProductStatus
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
  constructor(private http: HttpClient,
    public productServices : ProductService,
    public toastr: ToastrService,
    public dialogService: DialogService, 
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) {
    this.colsProduct = [
      {
        field: 'code',
        header: 'Mã sản phẩm',
        width: '15rem'
      },
      {
        field: 'name',
        header: 'Tên sản phẩm',
        width: '25rem'
      },
      {
        field: 'productTypeName',
        header: 'Loại',
        width: '10rem'
      },
      {
        field: 'price',
        header: 'Giá bán',
        width: '10rem'
      },
      {
        field: 'productStatusName',
        header: 'Trạng thái',
        width: '10rem'
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
  }
  getProductData(): void {
    this.productServices.getAllProduct(this.filterStatus).subscribe((data) => {
      console.log("data", data?.items);
      this.rows = data?.items;
      this.genlistAction(this.rows);
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
        element.imageUrl = element.imageUrl;
      });
      console.log(this.tableData);
    });
  }
  getDetailProductData():void {
    this.productServices.getAllViewDetailProduct(this.selectedProduct.id).subscribe((data)=>{
      this.detailProduct = data;
    })
  }
  onSelectionChange() {
   this.getDetailProductData();
  }
  createProduct() {
    this.ref = this.dialogService.open(CreateOrEditProductTestComponent, { 
      data: {
      },
      header: 'Chi tiết sản phẩm',
      width: '70%',
      contentStyle: { "max-height": "1900px", overflow: "auto", "margin-bottom": "40px"},
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((data) => {
      console.log("Data thêm", data);
      if(data){
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        window.location.reload();
      }
    });
  }
  editProduct(row) {
    const ref = this.dialogService.open(CreateOrEditProductTestComponent, {
      header: "Cập nhật thông tin",
      width: "1000px",
      height: "800px",
      contentStyle: { "max-height": "800px", overflow: "auto", "margin-bottom": "40px", },
      baseZIndex: 10000,
      data: {
        product: this.selectedProduct,
      },
    });
    //
    ref.onClose.subscribe((data) => {
      if (data){
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        window.location.reload();
      }
    });
  }
  deleteProduct(row) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.productServices.deleteProduct(row.id).subscribe((data)=>{
          this.productServices.getAllProduct().subscribe(()=>{
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công', life: 3000 });
            this.getProductData();
          })
    });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
              case ConfirmEventType.CANCEL:
                  break;
          }
      }
    });
    // this.productServices.deleteProduct(row.id).subscribe((data)=>{
    //   console.log("Data thêm", data);
      
    //   this.productServices.getAllProduct().subscribe(()=>{
    //     this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công', life: 3000 });
    //     this.getProductData();
    //   })
    // });
  }
  viewDetailProduct(data){
    console.log("abc",data);
    //this.viewDetail.show(data.id);
  }
  onFilterChange(){
    this.filter = !this.filter;
  }
  addDetailProduct(row){
    //this.modalAddDetailProduct.show(row.id,this.selectedProduct.code,this.selectedProduct.name)
  }
  editDetailProduct(row){
    //this.modalAddDetailProduct.show(row.id,this.selectedProduct.code,this.selectedProduct.name)
  }
  deleteDetailProduct(row){
    this.productServices.deleteDetailProduct(row.id).subscribe(()=>{
      this.toastr.success('Xoá thành công','Thông báo',{timeOut: 3000});
      this.productServices.getAllProduct().subscribe(()=>{
        this.getDetailProductData();
      })
    });
  }
  getTableHeight(percent = 65) {
    return (this.screenHeight*(percent/100) + 'px');     
  }

  genlistAction(data = []) {
    this.listAction = data.map((product, index) => {
      const actions = [];
        actions.push({
          data: product,
          label: "Sửa",
          icon: "pi pi-pencil",
          command: ($event) => {
            console.log("$22222222222", product);
            this.editProduct($event.item.data);
          },
        });
        //
        actions.push({
          data: product,
          index: index,
          label: "Xoá",
          icon: "pi pi-trash",
          command: ($event) => {
            this.deleteProduct($event.item.data);
          },
        });
      return actions;
    });
  }
}
