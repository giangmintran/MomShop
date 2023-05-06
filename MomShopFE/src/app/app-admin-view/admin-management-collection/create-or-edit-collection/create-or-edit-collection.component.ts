import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Collection } from 'src/models/collection';
import { CollectionService } from 'src/services/collection.service';
import { ProductConst } from 'src/shared/AppConst';
import { CreateOrEditProductCollectionComponent } from '../create-or-edit-product-collection/create-or-edit-product-collection.component';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-create-or-edit-received-order',
  templateUrl: './create-or-edit-collection.component.html',
  styleUrls: ['./create-or-edit-collection.component.scss']
})
export class CreateOrEditCollectionComponent implements OnInit {
  collection = new Collection();
  statuses = ProductConst.productStatus;
  collectionId;
  colProducts: any[] = [];
  products: any[] = [];
  selectedProduct: any[] = []
  constructor(private http: HttpClient, 
    public dialogService: DialogService, 
    public messageService: MessageService,  
    public configDialog: DynamicDialogConfig,
    public collectionService: CollectionService,
    public productService: ProductService,
    public toastr: ToastrService,
    public ref: DynamicDialogRef,
    ) {}

  ngOnInit(): void {
    console.log("vào đây", this.configDialog?.data);
    if(this.configDialog?.data.collection) {
      this.collection = this.configDialog?.data.collection;
      this.productService.getAllProduct().subscribe(
        (response) => {
          console.log("products: ", response.items);
          this.products = response?.items;
        },
        (err) => {
          console.log("err----", err);
        }
      );
    }
  }

  save() {
    if(this.validate()){
      this.collectionService.createOrEdit(this.collection).subscribe((data: any) => {
        this.ref.close(true);
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng nhập đầy đủ thông tin', life: 3000 });
    }
  }

  close() {
    this.ref.close(false);
  }
  validate(): boolean {
    console.log("product", this.collection.code);
    if (this.collection.code == null || this.collection.name == null){
      return false;
    }
    return true;
  }

  genlistAction(data = []) {
    // this.listAction = data.map((productDetail, index) => {
    //   const actions = [];
    //     actions.push({
    //       data: productDetail,
    //       label: "Sửa",
    //       icon: "pi pi-pencil",
    //       command: ($event) => {
    //         console.log("$22222222222", productDetail);
    //         //this.editDetail(productDetail);
    //       },
    //     });
    //     //
    //     actions.push({
    //       data: productDetail,
    //       index: index,
    //       label: "Xoá",
    //       icon: "pi pi-trash",
    //       command: ($event) => {
    //         //this.detailProduct($event.item.data, $event.item.index);
    //       },
    //     });
    //   return actions;
    // });
  }

  addProductCollection(){
    this.ref = this.dialogService.open(CreateOrEditProductCollectionComponent, { 
      data: {
      },
      header: 'Thêm sản phẩm',
      width: '70%',
      contentStyle: { "max-height": "1900px", overflow: "auto"},
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((data) => {
      console.log("Data thêm", data);
      if(data){
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        window.location.reload();
      }
    });
  }
}
