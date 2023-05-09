import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOrEditProductDetailTestComponent } from '../create-or-edit-product-detail-test/create-or-edit-product-detail-test.component';
import { ProductService } from 'src/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/models/product';
// import { ProductConst } from 'src/shared/AppConst';
// import { FileHandle } from 'src/shared/dragDrop.directive';
import { ProductDetailDto } from 'src/models/productDetail';
import { ImageService } from 'src/services/image.Service';
import { FileHandle } from 'src/shared/dragDrop.directive';
import { ProductConst } from 'src/shared/AppConst';
// import { ImageService } from 'src/services/image.Service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-or-edit-product-test',
  templateUrl: './create-or-edit-product-test.component.html',
  styleUrls: ['./create-or-edit-product-test.component.scss'],
})

export class CreateOrEditProductTestComponent implements OnInit {
  selectedFile: ImageSnippet; 
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
  imageObject;
  baseUrl = 'http://localhost:5001';

  constructor(private http: HttpClient,
    public dialogService: DialogService, 
    public messageService: MessageService,  
    public configDialog: DynamicDialogConfig,
    public productServices: ProductService,
    public toastr: ToastrService,
    public ref: DynamicDialogRef,
    public imageService: ImageService,
    private confirmationService: ConfirmationService,
    ) {}
  ngOnInit(): void {
    console.log("ầv", this.configDialog?.data.product);
    this.getData();
  }

  getData(){
    if(this.configDialog?.data.product) {
      this.productId = this.configDialog?.data.product[0].id
      this.productServices.getforEditProduct(this.configDialog.data?.product[0].id).subscribe(
        (response) => {
          console.log("res: ", response);
          this.product = response;
          this.imageObject = this.baseUrl + response.imageUrl;
          this.genlistAction(this.product.productDetails);
        },
        (err) => {
          console.log("err----", err);
        }
      );
    }
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log("src", this.selectedFile.file);
    });

    reader.readAsDataURL(file);
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

  deleteDetail(row){
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.productServices.deleteDetailProduct(row.id).subscribe((data)=>{
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công', life: 3000 });
            this.getData();
    });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
              case ConfirmEventType.CANCEL:
                  break;
          }
      }
    });
  }
  save() {
    if(this.validate()){
      console.log("res1", this.product);
      this.productServices.createOrEdit(this.product).subscribe((data: any) => {
        console.log("res", data);
        if(this.selectedFile){
          const formData = new FormData();
          formData.append('input', this.selectedFile.file);
          formData.append('productId', data.id);
          this.imageService.uploadImage(formData,data.id).subscribe(
          (res) => {
            this.onSuccess();
          },
          (err) => {
            this.onError();
          })
        }
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
    console.log("product", this.product);
    if (this.product.code == undefined || this.product.name == undefined || this.product.price == undefined){
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
            this.deleteDetail($event.item.data);
          },
        });
      return actions;
    });
  }

  selectProductDetail(productDetail: ProductDetailDto) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: productDetail.size });
  }
}
