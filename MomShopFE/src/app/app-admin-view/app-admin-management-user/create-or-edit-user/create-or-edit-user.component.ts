import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UpdateProductDto } from 'src/models/UpdateProductDto';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss'],
})
export class CreateOrEditUserComponent {
  input: UpdateProductDto = new UpdateProductDto();
  product : Product = new Product;
  saving = false;
  active;
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(public productServices: ProductService) {}
  show(id?) {
    if(id){
        this.productServices.detailProduct(id).subscribe((data:UpdateProductDto)=>{
              this.input = data;
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
    
    this.productServices.createOrEdit(this.input).subscribe(()=>{
      this.active = false;
      this.modalSave.emit(null);
      this.close();
    });
  }
}
