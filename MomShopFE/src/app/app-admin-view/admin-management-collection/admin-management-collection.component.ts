import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CollectionService } from 'src/services/collection.service';
import { CreateOrEditCollectionComponent } from './create-or-edit-collection/create-or-edit-collection.component';

@Component({
  selector: 'app-admin-management-collection',
  templateUrl: './admin-management-collection.component.html',
  styleUrls: ['./admin-management-collection.component.scss'],
  providers: [DialogService,ConfirmationService, MessageService]
})
export class AdminManagementCollectionComponent implements OnInit {
  ref: DynamicDialogRef;
  rows: any[] = [];
  cols;
  listAction: any[] = [];
  filter = true;
  filterStatus = null;
  tableData: any;
  metaKeySelection: boolean = true;
  selectedCollection;
  screenHeight: number = window.innerHeight;

  listStatus = [
    {code :'Tất cả',value:undefined},
    {code :'Đang bán',value:1},
    {code :'Chưa mở bán',value:2},
    {code :'Khoá',value:3},
  ];
  constructor(private http: HttpClient,
    public collectionService : CollectionService,
    public toastr: ToastrService,
    public dialogService: DialogService, 
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) {}
  ngOnInit(): void {
    this.cols = [
      {
        field: 'id',
        header: '#ID',
      },
      {
        field: 'code',
        header: 'Mã',
      },
      {
        field: 'name',
        header: 'Tên',
      },
      {
        field: 'statusDisplay',
        header: 'Trạng thái',
      },
    ];
    this.getData();
  }

  getTableHeight(percent = 65) {
    return (this.screenHeight*(percent/100) + 'px');     
  }

  onFilterChange(){
    this.filter = !this.filter;
  }
  editProduct(row) {
    const ref = this.dialogService.open(CreateOrEditCollectionComponent, {
      header: "Cập nhật thông tin",
      width: "1000px",
      height: "800px",
      contentStyle: { "max-height": "800px", overflow: "auto", "margin-bottom": "40px", },
      baseZIndex: 10000,
      data: {
        collection: this.selectedCollection,
      },
    });
    //
    ref.onClose.subscribe((data) => {
      if (data){
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
        this.getData();
      }
    });
  }
  genlistAction(data = []) {
    this.listAction = data.map((product, index) => {
      const actions = [];
        actions.push({
          data: product,
          label: "Sửa",
          icon: "pi pi-pencil",
          command: ($event) => {
            console.log("$22222222222", product);
            this.editProduct($event.item.data);
          },
        });
        //
        actions.push({
          data: product,
          index: index,
          label: "Xoá",
          icon: "pi pi-trash",
          command: ($event) => {
            //this.deleteProduct($event.item.data);
          },
        });
      return actions;
    });
  }
  getData(): void {
    this.collectionService.getAllCollection(this.filterStatus).subscribe((data) => {
      console.log("data", data);
      this.rows = data;
      this.genlistAction(this.rows);
      this.rows.forEach(element => {
        var statusDisplayName = this.listStatus.find( e=> e.value == element.status).code
        if(statusDisplayName)
        {
          element.statusDisplayName = statusDisplayName
        }
        if(statusDisplayName){
          element.statusDisplayName = statusDisplayName
        }
        element.imageUrl = element.imageUrl;
      });
      console.log(this.tableData);
    });
  }

  createCollection(){
    this.ref = this.dialogService.open(CreateOrEditCollectionComponent, { 
      data: {
      },
      header: 'Bộ sưu tập',
      width: '70%',
      contentStyle: { "max-height": "1900px", overflow: "auto", "margin-bottom": "40px"},
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
