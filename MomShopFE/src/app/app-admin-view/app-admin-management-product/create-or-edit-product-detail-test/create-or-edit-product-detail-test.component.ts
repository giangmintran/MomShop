import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDetailDto } from 'src/models/productDetail';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-product-detail-test',
  templateUrl: './create-or-edit-product-detail-test.component.html',
  styleUrls: ['./create-or-edit-product-detail-test.component.scss']
})
export class CreateOrEditProductDetailTestComponent {

  productDetail : ProductDetailDto = new ProductDetailDto();
  product : any;

  constructor(private http: HttpClient,
    public dialogService: DialogService, 
    public messageService: MessageService,  
    public configDialog: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public productServices: ProductService,
    public toastr: ToastrService
    ) {}

  
  ngOnInit(): void {
      this.product = this.configDialog?.data;
      this.productDetail.productId = this.product.productId;
    if(this.configDialog?.data.productDetail){
      console.log("productDetail", this.configDialog?.data.productDetail);
      this.productDetail = this.configDialog?.data.productDetail;
    }
   
  }

  save() {
    this.productServices.createOrEditDetailProduct(this.productDetail).subscribe(()=>{
      this.ref.close();
    });
  }

  close() {
    this.ref.close();
  }
}
