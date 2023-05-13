import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/models/register';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './app-user-register.component.html',
  styleUrls: ['./app-user-register.component.scss']
})
export class AppUserRegisterComponent {
  inputRegister: RegisterDto = new RegisterDto
  constructor(private _user: UserService,
    public toastr: ToastrService, private router: Router) {
  }
  register() {
    this._user.register(this.inputRegister).subscribe(result => {
      console.log(result);
      if (result === "success") {
        this.toastr.success("Đăng ký thành công",
          "Thông báo",
          { timeOut: 2000 });
        this.router.navigateByUrl('/login');
      }
      if (result === "duplicate") {
        this.toastr.warning("Tài khoản đã tồn tại",
          "Thông báo",
          { timeOut: 2000 });
      }
    })
  }
}
