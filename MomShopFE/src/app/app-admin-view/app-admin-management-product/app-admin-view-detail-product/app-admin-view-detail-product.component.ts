import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UpdateProductDto } from 'src/models/updateProduct';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-admin-view-detail-product',
  templateUrl: './app-admin-view-detail-product.component.html',
  styleUrls: ['./app-admin-view-detail-product.component.scss']
})
export class AppAdminViewDetailProductComponent {
  product: UpdateProductDto = new UpdateProductDto();
  saving = false;
  active;
  cities;
  name:string;
  test;
  category
  quantity;
  tableData;
  cols
  selectedProduct
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(public productServices: ProductService,public toastr: ToastrService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
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
        field: 'producType',
        header: 'Loại sản phẩm',
      },
      {
        field: 'priceSell',
        header: 'Giá bán',
      },
      {
        field: 'priceImport',
        header: 'Giá nhập',
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
  }
  show(id?) {
    if(id){
        
    }
    this.modal.show();
    this.active = true;
  }
  getProductData(): void {
    this.productServices.getAllProduct().subscribe((data) => {
      this.tableData = data;
      this.selectedProduct = undefined
    });
  }
  close() {
    this.active = false;
    this.modal.hide();
  }
  save() {
    this.productServices.createOrEdit(this.product).subscribe(()=>{
      this.active = false;
      this.toastr.success('Thêm thành công','Toartr fun!');
      this.modalSave.emit(null);
      this.close();
    });
  }
}
