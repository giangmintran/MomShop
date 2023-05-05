import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDto } from "src/models/login";

@Injectable({
    providedIn: 'root',
})
export class UserService{
    baseUrl = 'http://localhost:5001/api/user/';
    constructor(private http: HttpClient) { }
    login(input:LoginDto){
        return this.http.post(this.baseUrl + 'login',input)
    }
}