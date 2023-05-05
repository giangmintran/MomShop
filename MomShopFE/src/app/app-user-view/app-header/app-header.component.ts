import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent {
  @Output() modalSaves: EventEmitter<any> = new EventEmitter<any>();
  @Output() backHome: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}
  routerToCart() {
    this.modalSaves.emit(null);
  }
  backToHome() {
    this.backHome.emit(null);
  }
}
