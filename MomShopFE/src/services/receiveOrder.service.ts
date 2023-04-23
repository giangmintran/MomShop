import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})

export class ReceiveOrder {
    baseUrl = 'http://localhost:5001/api/receive-order/';
    constructor(private http: HttpClient) { }
    //xem thông tin đơn hàng
    getAllReceiveOrder(): Observable<any> {
        return this.http.get(this.baseUrl + 'find-all');
    }
    //xem thông tin đơn hàng theo id
    getReceiveOrderById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + 'find-by-id/' + id)
    }
    //thêm, sửa thông tin đơn hàng
    createOrEditReceiveOrder(order: any) {
        if (order.id) {
            return this.http.put(this.baseUrl + 'update', order);
        }
        else {
            return this.http.post(this.baseUrl + 'add', order);
        }
    }
    //xóa thông tin đơn hàng
    deleteReceiveOrder(id: number) {
        return this.http.delete(this.baseUrl + 'delete/' + id)
    }
    /// chi tiết đơn hàng
    getDetailReceiveOrderById(id: number) {
        return this.http.get(this.baseUrl + 'details/' + id)
    }
    //thêm thông tin chi tiết đơn hàng
    createOrEditDetailReceiveOrder(order: any) {
        if (order.id) {
            return this.http.put(this.baseUrl + "update-detail", order)
        }
        else {
            return this.http.post(this.baseUrl + "add-detail", order);
        }
    }
    deleteDetailReceiveOrder(id:number){
        return this.http.delete(this.baseUrl + 'delete-detail/' + id)
    }
}
