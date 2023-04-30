import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor( private router: Router) {}
  
  passlogin :boolean = true;
  checkLogin = false;
  routerPage(){
    this.checkLogin = true;
    this.passlogin = false;
    this.router.navigate(['/view'])
  }
}
