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
  user: UserDto;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {}
 
}
