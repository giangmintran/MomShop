import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface User {
  Id: number;
  type: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MomShopFE';
  user: User;
  dataUser: any;
  isAdmin: boolean = false;
  sidebarExpanded = true;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.getProductData();
  }
  getProductData(): User {
    const url = 'http://localhost:5001/api/user/find-all';
    this.http.get<User>(url).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        console.error(error);
      }
    );
    return this.user;
  }
}


