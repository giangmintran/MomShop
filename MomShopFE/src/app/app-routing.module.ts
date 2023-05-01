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

const routes: Routes = [
  { path: 'product', component: AppAdminManagementProductComponent },
  { path: 'customer', component: AppAdminMangementCustomerComponent },
  { path: 'feedback', component: AppAdminFeedbackUserComponent },
  { path: 'importProduct', component: AppAdminManagementImportProductComponent },
  { path: 'collection', component: AdminManagementCollectionComponent },
  { path: 'view', component: AppUserMainComponent, pathMatch: 'full'},
  { path: 'cart', component: AppUserCartComponent, pathMatch: 'full'},
  //{ path: 'home', component: MainComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
