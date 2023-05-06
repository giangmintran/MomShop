import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})

export class ReceiveOrderService {
    baseUrl = 'http://localhost:5001/api/receive-order/';
    constructor(private http: HttpClient) { }
    //xem thông tin đơn hàng
    getAllReceiveOrder(status?): Observable<any> {
        if(status == undefined){
            return this.http.get(this.baseUrl + 'find-all');
        }
        return this.http.get(this.baseUrl + 'find-all' +'?status=' + status);
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
    getDetailReceiveOrder(id: number) {
        return this.http.get(this.baseUrl + 'details/' + id)
    }
    /// chi tiết đơn hàng
    getDetai(id: number) {
        return this.http.get(this.baseUrl + 'detail/find/' + id)
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
    deleteDetailReceiveOrder(id: number){
        return this.http.delete(this.baseUrl + 'delete-detail/' + id)
    }
}
