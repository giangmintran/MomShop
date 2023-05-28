import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UserDto } from "src/models/user";
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
  visiableMain;
  dataUser: any;
  isAdmin: boolean = false;
  sidebarExpanded = true;
  visableCart: boolean = false;
  visiableLogin: boolean = false;
  userType;
  accountUser;
  user: UserDto;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.accountUser = JSON.parse(localStorage.getItem('user'));
  }
 
}
