import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UpdateProductDto } from 'src/models/updateProduct';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-detail-product',
  templateUrl: './create-or-edit-detail-product.component.html',
  styleUrls: ['./create-or-edit-detail-product.component.scss']
})
export class CreateOrEditDetailProductComponent {
  product: UpdateProductDto = new UpdateProductDto();
  productFind: any = {
    'name': null,
    'price': null,
    'description': null,
    'status': null,
    'productType': null,
  };
  productDetails: any[] = [];
  
  saving = false;
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
  ngOnDestroy(): void {
    this.productFind = null;
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
    this.productFind.code = null;
    this.productFind.name = null;
    this.productFind.price = null;
    this.productFind.description = null;
    this.productFind.status = null;
    this.productFind.productType = null;
    this.productFind.id = null;
    this.productFind.productDetails = null;
  }

  show(id?) {
    if(id){
      this.productServices.detailProduct(id).subscribe((data) => {
        this.productFind = data;
        this.productDetails = data.productDetails;
      });
    }
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.clearData();
    this.modal.hide();
  }
  save() {
    if (this.productFind.id == undefined) {
      this.productServices.createOrEdit(this.productFind).subscribe(()=>{
        this.active = false;
        this.toastr.success('Thêm thành công','Thông báo');
        this.modalSave.emit(null);
        this.close();
      });
    } else {
      this.productServices.createOrEdit(this.productFind).subscribe(()=>{
        this.active = false;
        this.toastr.success('Cập nhật thành công','Thông báo');
        this.modalSave.emit(null);
        this.close();
      });
    }
  }
  getProductData(){}
}
