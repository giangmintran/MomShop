import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailDto } from 'src/models/productDetail';
import { UpdateProductDto } from 'src/models/updateProduct';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-detail-product',
  templateUrl: './create-or-edit-detail-product.component.html',
  styleUrls: ['./create-or-edit-detail-product.component.scss']
})
export class CreateOrEditDetailProductComponent {
  productDetail : ProductDetailDto = new ProductDetailDto();
  saving = false;
  productDetailId
  productName;
  productCode;
  active;
  cities;
  name:string;
  test;
  category
  quantity;
  tableData;
  cols;
  colDetails;
  listTypeProduct;
  listStatus;
  selectedProduct
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(public productServices: ProductService,public toastr: ToastrService) {
    
  }
  ngOnInit(): void {
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    this.listStatus = [
      { name: "Đang bán", value: 1 },
      { name: "Chưa mở bán", value: 2 },
      { name: "Khóa", value: 3 },
    ];
    this.colDetails = [
      {
        field: 'id',
        header: 'STT',
      },
      {
        field: 'size',
        header: 'Size',
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
  }

  clearData() {
   
  }

  show(productId?:number,name?:any,code?:string,id?:number) {
    this.productName = name;
    this.productCode = code;
    if(id){
      this.productServices.getforEditProductDetail(id).subscribe((data) => {
       this.productDetail = data;
      });
    }
    this.productDetail.productId = productId;
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.clearData();
    this.modal.hide();
  }
  save() {
      this.productServices.createOrEditDetailProduct(this.productDetail).subscribe(()=>{
        this.active = false;
        if(this.productDetail.id == undefined){
          this.toastr.success('Thêm thành công','Thông báo',{timeOut: 3000});
        }
        else 
        {
          this.toastr.success('Cập nhật thành công','Thông báo',{timeOut: 3000});

        }
        this.productDetail = new ProductDetailDto();
        this.modalSave.emit(null);
        this.close();
      });
    }
}
