import { Component, EventEmitter, Output } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(private router: Router) {}
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  passlogin: boolean = true;
  checkLogin = false;
  routerPage() {
    this.modalSave.emit(null);
  }
}
