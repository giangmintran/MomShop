import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
interface User {
  Id: number;
  type: number;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "MomShopFE";
  user: User;
  dataUser: any;
  isAdmin: boolean = false;
  sidebarExpanded = true;
  visableCart: boolean = false;
  visiableLogin: boolean = true;
  visiableRegister: boolean = false;
  visableHome: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  clickLogin() {
    this.visiableLogin = false;
    this.visableCart = false;
    this.visableHome = true;
  }
  clickCart() {
    this.visiableLogin = false;
    this.visableCart = true;
    this.visiableRegister = false;
    this.visableHome = false;
  }
  openRegister() {
    this.visiableRegister = true;
    this.visiableLogin = false;
    this.visableCart = false;
  }
  backHome() {
    this.visiableRegister = false;
    this.visiableLogin = false;
    this.visableCart = false;
    this.visableHome = true;
  }
}
