import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CreateProductDto } from 'src/models/createProductDto';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss'],
})
export class CreateOrEditUserComponent {
  product: CreateProductDto = new CreateProductDto();
  saving = false;
  active;
  cities;
  name:string;
  test;
  category
  quantity
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
  }
  show(id?) {
    if(id){
        
    }
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.modal.hide();
  }
  save() {
    this.productServices.createOrEdit(this.product).subscribe(()=>{
      this.active = false;
      this.toastr.success('Thêm thành công','Thông báo',{timeOut: 1000});
      this.modalSave.emit(null);
      this.close();
    });
  }
}
