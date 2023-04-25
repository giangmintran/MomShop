import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOrEditProductDetailTestComponent } from '../create-or-edit-product-detail-test/create-or-edit-product-detail-test.component';
import { ProductService } from 'src/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
import { ProductConst } from 'src/shared/AppConst';
import { FileHandle } from 'src/shared/dragDrop.directive';
import { ProductDetailDto } from 'src/models/productDetail';

@Component({
  selector: 'app-create-or-edit-product-test',
  templateUrl: './create-or-edit-product-test.component.html',
  styleUrls: ['./create-or-edit-product-test.component.scss'],
  providers: [DialogService, MessageService]
})
export class CreateOrEditProductTestComponent implements OnInit {

  product: ProductDto = new ProductDto();
  types = ProductConst.productType;
  statuses = ProductConst.productStatus;
  active;
  files: FileHandle[] = [];
  menuItems: MenuItem[] = [];
  listAction: any[] = [];
  productId: number;
  selectedProductDetail;
  imageUrl;
  metaKeySelectionDetail: boolean = true;

  constructor(private http: HttpClient,
    public dialogService: DialogService, 
    public messageService: MessageService,  
    public configDialog: DynamicDialogConfig,
    public productServices: ProductService,
    public toastr: ToastrService,
    public ref: DynamicDialogRef,
    ) {}
  ngOnInit(): void {
    console.log("ầv", this.configDialog?.data.product);
    if(this.configDialog?.data.product) {
      this.productId = this.configDialog?.data.product[0].id
      this.productServices.getforEditProduct(this.configDialog.data?.product[0].id).subscribe(
        (response) => {
          console.log("res: ", response);
          this.product = response;
          this.genlistAction(this.product.productDetails);
        },
        (err) => {
          console.log("err----", err);
        }
      );
    }
  }

  addDetail() {
    // this.modalCreateOrEdit.show();
    const ref = this.dialogService.open(CreateOrEditProductDetailTestComponent, { 
      header: 'Thông tin chi tiết',
      width: '600px',
      contentStyle: { "max-height": "1000px", overflow: "auto", "margin-bottom": "40px", },
      data: {
        productId: this.productId
      }
    });

    ref.onClose.subscribe(() => {
      this.productServices.getforEditProduct(this.configDialog.data?.product[0].id).subscribe(
        (response) => {
        console.log("res: ", response);
          this.product = response;
          this.genlistAction(this.product.productDetails);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        },
        (err) => {
          console.log("err----", err);
        }
      );
    });
  }

  editDetail(productDetail) {
    // this.modalCreateOrEdit.show();
    const ref = this.dialogService.open(CreateOrEditProductDetailTestComponent, { 
      header: 'Thông tin chi tiết',
      width: '600px',
      contentStyle: { "max-height": "1000px", overflow: "auto", "margin-bottom": "40px", },
      data: {
        productDetail: productDetail
      }
    });

    ref.onClose.subscribe(() => {
      this.productServices.getforEditProduct(this.configDialog.data?.product[0].id).subscribe(
        (response) => {
        console.log("res: ", response);
          this.product = response;
          this.genlistAction(this.product.productDetails);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
        },
        (err) => {
          console.log("err----", err);
        }
      );
    });
  }

  save() {
    if(this.validate()){
      this.productServices.createOrEdit(this.product).subscribe((data) => {
        this.imageUrl = "áds";
        this.ref.close(true);
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng nhập đầy đủ thông tin', life: 3000 });
    }
  }

  close() {
    this.ref.close(false);
  }

  onBasicUploadAuto(event) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }
  handleUpload(event){
    console.log("file name event",event);
    const fileName = event.files[0].name;
    console.log("file name",fileName);
    this.imageUrl = fileName;
  }

  validate(): boolean {
    console.log("product", this.product.code);
    if (this.product.code == null || this.product.name == null || this.product.price == null){
      return false;
    }
    return true;
  }

  genlistAction(data = []) {
    this.listAction = data.map((productDetail, index) => {
      const actions = [];
        actions.push({
          data: productDetail,
          label: "Sửa",
          icon: "pi pi-pencil",
          command: ($event) => {
            console.log("$22222222222", productDetail);
            this.editDetail(productDetail);
          },
        });
        //
        actions.push({
          data: productDetail,
          index: index,
          label: "Xoá",
          icon: "pi pi-trash",
          command: ($event) => {
            //this.detailProduct($event.item.data, $event.item.index);
          },
        });
      return actions;
    });
  }

  selectProductDetail(productDetail: ProductDetailDto) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: productDetail.size });
  }
}
