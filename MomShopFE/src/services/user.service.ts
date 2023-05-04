import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "src/models/login";

@Injectable({
    providedIn: 'root',
})
export class UserService{
    baseUrl = 'http://localhost:5001/api/receive-order/';
    constructor(private http: HttpClient) { }
    login(input:LoginDto){
        return this.http.put(this.baseUrl + '/login',input)
    }
}