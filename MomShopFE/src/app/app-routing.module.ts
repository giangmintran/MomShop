import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminFeedbackUserComponent } from './app-admin-view/app-admin-feedback-user/app-admin-feedback-user.component';
import { AppAdminManagementProductComponent } from './app-admin-view/app-admin-management-product/app-admin-management-product.component';
import { AppAdminMangementCustomerComponent } from './app-admin-view/app-admin-mangement-customer/app-admin-mangement-customer.component';
import { AppAdminManagementImportProductComponent } from './app-admin-view/app-admin-management-import-product/app-admin-management-import-product.component';

const routes: Routes = [
  { path: 'product', component: AppAdminManagementProductComponent },
  { path: 'customer', component: AppAdminMangementCustomerComponent },
  { path: 'feedback', component: AppAdminFeedbackUserComponent },
  { path: 'importProduct', component: AppAdminManagementImportProductComponent },
  //{ path: 'home', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
