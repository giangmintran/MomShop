import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderService } from 'src/services/order.service';
import { OrderConst } from 'src/shared/AppConst';

@Component({
  selector: 'app-app-admin-management-order',
  templateUrl: './app-admin-management-order.component.html',
  styleUrls: ['./app-admin-management-order.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class AppAdminManagementOrderComponent  implements OnInit {

  listAction: any[] = [];
  rows;
  cols;
  receiveOrderDetailData;
  receiveOrderData;
  selectedRow;
  totalRecords;
  filter = true;
  filterStatus = null;
  keyword: string | undefined;
  timer: any;
  selectedOrder;
  constructor(private http: HttpClient, 
    private orderService: OrderService,
    public toastr: ToastrService, 
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private datePipe: DatePipe,
    ) {}

  ngOnInit(): void {
    this.cols = [
      {
        field: 'customerName',
        header: 'Tên khách hàng',
      },
      {
        field: 'createdDateDisplay',
        header: 'Ngày đặt hàng',
      },
      {
        field: 'intendedTimeDisplay',
        header: 'Ngày nhận (dự kiến)',
      },
      {
        field: 'totalAmount',
        header: 'Tổng giá trị',
      },
      {
        field: 'addressDelivery',
        header: 'Địa chỉ giao hàng',
      },
      {
        field: 'statusDisplay',
        header: 'Trạng thái',
      },

    ];
    this.getData();
  }

  getData(): void {
    this.orderService.getAllOrder().subscribe((data) => {
      this.rows = data;
      this.genlistAction(this.rows);
      this.rows.forEach(element => {
        element.addressDelivery = element.address + ", " + element.province + ", " + element.district;
        element.createdDateDisplay = this.formatDate(element.createdDate);
        element.intendedTimeDisplay = this.formatDate(element.intendedTime);
        element.statusDisplay = OrderConst.getStatus(element.orderStatus);
      });
    });
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  genlistAction(data = []) {
    this.listAction = data.map((product, index) => {

      const actions = [];
        actions.push({
          data: product,
          label: "Chi tiết",
          icon: "pi pi-eye",
          command: ($event) => {
            console.log("$22222222222", product);
            this.editOrder($event.item.data);
          },
        });

        if (product.orderStatus == 1){
          actions.push({
            data: product,
            label: "Tiếp nhận đơn",
            icon: "pi pi-arrow-circle-down",
            command: ($event) => {
              console.log("$22222222222", $event.item.data.id);
              this.acceptOrder($event.item.data.id);
            },
          });
        }
        
        if (product.orderStatus == 2){
          actions.push({
            data: product,
            label: "Đang giao đơn",
            icon: "pi pi-truck",
            command: ($event) => {
              console.log("$22222222222", product);
              this.processOrder($event.item.data.id);
            },
          });
        }

        if (product.orderStatus == 3){
          actions.push({
            data: product,
            label: "Hoàn thành đơn",
            icon: "pi pi-check-circle",
            command: ($event) => {
              console.log("$22222222222", product);
              this.completedOrder($event.item.data.id);
            },
          });
        }
        
        if (product.orderStatus != 4){
          actions.push({
            data: product,
            label: "Hủy đơn",
            icon: "pi pi-times",
            command: ($event) => {
              console.log("$22222222222", product);
              this.cancelorder($event.item.data.id);
            },
          });
        }
        
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

  editOrder(data: any){
    console.log(data);
    const navigationExtras: NavigationExtras = {
      queryParams: { id: data.id }
    };
    this.router.navigate(['admin/order-management/order/detail'],navigationExtras);
  }

  acceptOrder(data: any){
   this.orderService.acceptOrder(data).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
      this.getData();
   })
  }

  processOrder(data: any){
    this.orderService.processOrder(data).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
      this.getData();
   })
  }

  completedOrder(data: any){
    this.orderService.completeOrder(data).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
      this.getData();
   })
  }

  cancelorder(data: any){
    this.orderService.cancelOrder(data).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật thành công', life: 3000 });
      this.getData();
   })
  }
}
