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
  visiableMain;
  dataUser: any;
  isAdmin: boolean = false;
  sidebarExpanded = true;
  visableCart: boolean = false;
  visiableLogin: boolean = false;
  userType;
  accountUser;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.accountUser = JSON.parse(localStorage.getItem('user'));
  }
 
  backHome() {
    this.visiableMain = true;
    this.visiableLogin = false;
  }
  redirectFormRegister(){
    this.visiableMain = false;
    this.visiableLogin = false;
  }
}
