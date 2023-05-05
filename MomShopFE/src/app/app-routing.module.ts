import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminFeedbackUserComponent } from './app-admin-view/app-admin-feedback-user/app-admin-feedback-user.component';
import { AppAdminManagementProductComponent } from './app-admin-view/app-admin-management-product/app-admin-management-product.component';
import { AppAdminMangementCustomerComponent } from './app-admin-view/app-admin-mangement-customer/app-admin-mangement-customer.component';
import { AppAdminManagementImportProductComponent } from './app-admin-view/app-admin-management-import-product/app-admin-management-import-product.component';
import { AppUserMainComponent } from './app-user-view/app-user-main/app-user-main.component';
import { AdminManagementCollectionComponent } from './app-admin-view/admin-management-collection/admin-management-collection.component';
import { AppUserCartComponent } from './app-user-view/app-user-cart/app-user-cart.component';
import { LoginComponent } from './app-login/login/login.component';
import { AppUserRegisterComponent } from './app-user-view/app-user-register/app-user-register.component';
import { AppAdminMenuComponent } from './app-admin-view/app-admin-menu/app-admin-menu.component';

const routes: Routes = [
  //{ path: '',redirectTo:'/login',pathMatch: 'full' },
  { path: 'admin/product', component: AppAdminManagementProductComponent },
  //{ path: 'login', component: LoginComponent },
  { path: 'admin/customer', component: AppAdminMangementCustomerComponent },
  { path: 'admin/feedback', component: AppAdminFeedbackUserComponent },
  { path: 'admin/importProduct', component: AppAdminManagementImportProductComponent },
  { path: 'admin/collection', component: AdminManagementCollectionComponent },
  { path: 'home', component: AppUserMainComponent},
  { path: 'cart', component: AppUserCartComponent},
  { path: 'register', component: AppUserRegisterComponent},
  { path: 'admin', component: AppAdminMenuComponent},
 //{ path: '**',redirectTo:'/login',pathMatch: 'full' },
  // { path: '/',redirectTo:'/login',pathMatch: 'full' },
  //{ path: 'home', component: MainComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
