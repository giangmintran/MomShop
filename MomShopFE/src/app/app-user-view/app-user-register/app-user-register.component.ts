import { HttpClient } from '@angular/common/http';
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
  constructor(private _user: UserService,private http: HttpClient,
    public toastr: ToastrService, private router: Router) {
  }
  register() {
    this._user.register(this.inputRegister).subscribe((result: any) => {
      console.log(result.message);
      console.log(result.message === "duplicate");
      if (result.data != null) {
        this.toastr.success("Đăng ký thành công",
          "Thông báo",
          { timeOut: 2000 });
        localStorage.setItem('user', JSON.stringify(result.data));
        this.router.navigateByUrl('/view');
      }
      if (result.message === "duplicate") {
        this.toastr.warning("Tài khoản đã tồn tại",
          "Thông báo",
          { timeOut: 2000 });
      }
    })
  }
}
