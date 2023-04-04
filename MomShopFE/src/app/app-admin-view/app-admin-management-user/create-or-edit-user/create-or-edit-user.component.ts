import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
  test;
  name;
  category
  quantity
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(public productServices: ProductService) {}
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
      this.modalSave.emit(null);
      this.close();
    });
  }
}
