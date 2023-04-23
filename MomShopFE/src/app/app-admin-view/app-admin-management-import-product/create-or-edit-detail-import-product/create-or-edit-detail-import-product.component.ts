import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReceivedOrderDetailDto } from 'src/models/receivedDetailOrder';
import { UpdateProductDto } from 'src/models/updateProduct';
import { ProductService } from 'src/services/product.service';
import { ReceiveOrder } from 'src/services/receiveOrder.service';

@Component({
  selector: 'app-create-or-edit-detail-import-product',
  templateUrl: './create-or-edit-detail-import-product.component.html',
  styleUrls: ['./create-or-edit-detail-import-product.component.scss']
})
export class CreateOrEditDetailImportProductComponent {
  product: ReceivedOrderDetailDto[] = [] ;
  saving = false;
  active;
  cities;
  name: string;
  test;
  listStatus;
  listTypeProduct;
  category;
  quantity;
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public receiveOrderDetail: ReceiveOrder,
    public toastr: ToastrService
  ) {
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
    this.listStatus = [
      {code :'Tất cả',value:undefined},
      {code :'Đang bán',value:1},
      {code :'Chưa mở bán',value:2},
      {code :'Khoá',value:3},
    ]
  }
  show(id?) {
    if (id) {
      this.receiveOrderDetail.getDetailReceiveOrderById(id).subscribe((data) => {
        //this.product = data;
        //this.product .receivedDate = moment( this.product .receivedDate).format('DD/MM/YYYY')
        //this.product.id = id;
      })
    }
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.modal.hide();
  }
  save() {
    this.receiveOrderDetail.createOrEditDetailReceiveOrder(this.product).subscribe(() => {
      this.active = false;
      this.toastr.success("Thêm thành công", "Toartr fun!");
      this.modalSave.emit(null);
      this.close();
    });
  }
}
