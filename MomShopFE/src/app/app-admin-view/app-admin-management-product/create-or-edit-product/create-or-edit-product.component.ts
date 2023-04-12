import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UpdateProductDto } from 'src/models/UpdateProductDto';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-product',
  templateUrl: './create-or-edit-product.component.html',
  styleUrls: ['./create-or-edit-product.component.scss']
})
export class CreateOrEditProductComponent {
  product: UpdateProductDto = new UpdateProductDto();
  input: UpdateProductDto = new UpdateProductDto();
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
      this.toastr.success('Thêm thành công','Toartr fun!');
      this.modalSave.emit(null);
      this.close();
    });
  }
}
