import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent {
  @Output() modalSaves: EventEmitter<any> = new EventEmitter<any>();
  @Output() backHome: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private toastr: ToastrService) {}
  routerToCart() {
    this.modalSaves.emit(null);
  }
  backToHome() {
    this.backHome.emit(null);
  }
  logout() {
    this.toastr.success("Đăng xuất thành công", "Thông báo", { timeOut: 2000 });
    this.router.navigateByUrl('/home');
  }
}
