import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/services/dashboard.service';
import { DashboardConst, ProductStatus } from 'src/shared/AppConst';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    baseUrl = 'http://localhost:5001';
    products;
    responsiveOptions: any[];
    data: any;
    yAxisTicks: number[] = [10, 10, 10, 10, 42, 10, 10, 10, 10, 10, 10, 10];
    options: any;
    dataOrder: number[] = [];
    dataReceiveOrder: number[];
    listStatus;
    DashboardConst = DashboardConst;
    ProductStatus = ProductStatus;
    constructor(private http: HttpClient, private route: Router, private dashboard: DashboardService) {
        this.listStatus = [
            {code :'Tất cả',value:undefined},
            {code :'Đang bán',value:1},
            {code :'Chưa mở bán',value:2},
            {code :'Khoá',value:3},
            {code :'Hết hàng',value:4},
          ]
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
    ngOnInit() {
        if (sessionStorage.getItem('userType')) {
            location.reload();
            sessionStorage.clear();
        }
        this.dashboard.dashboard().subscribe((data: any) => {
            this.dataOrder = data.orders;
            console.log(data.orders);
            console.log(this.yAxisTicks);
            console.log(data.products);
            this.dataReceiveOrder = data.receivedOrders;
            this.processData(data);
            this.products = data.products;
            this.products.forEach(element => {
                var productStatusName = this.listStatus.find( e=> e.value == element.status).code
                element.imageUrl = element.imageUrl;
              });
        });
    }
    processData(data: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Đơn hàng',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: this.dataOrder
                },
                {
                    label: 'Nhập hàng',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: this.dataReceiveOrder
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                }

            }
        };
    }

    
}
