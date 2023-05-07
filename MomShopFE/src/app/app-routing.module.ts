import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminFeedbackUserComponent } from './app-admin-view/app-admin-feedback-user/app-admin-feedback-user.component';
import { AppAdminManagementProductComponent } from './app-admin-view/app-admin-management-product/app-admin-management-product.component';
import { AppAdminMangementCustomerComponent } from './app-admin-view/app-admin-mangement-customer/app-admin-mangement-customer.component';
import { AppAdminManagementImportProductComponent } from './app-admin-view/app-admin-management-import-product/app-admin-management-import-product.component';
import { AppUserMainComponent } from './app-user-view/app-user-main/app-user-main.component';
import { UserIntroComponent } from './app-user-view/user-intro/user-intro.component';
import { LogInComponent } from './app-user-view/log-in/log-in.component';
import { UserCollectionComponent } from './app-user-view/user-collection/user-collection.component';
import { PolicyGuideComponent } from './app-user-view/policy-guide/policy-guide.component';

const routes: Routes = [
  { path: 'product', component: AppAdminManagementProductComponent },
  { path: 'customer', component: AppAdminMangementCustomerComponent },
  { path: 'feedback', component: AppAdminFeedbackUserComponent },
  { path: 'importProduct', component: AppAdminManagementImportProductComponent },
  { path: 'view', 
    component: AppUserMainComponent ,
    children: [
      {path: '', component: UserIntroComponent},
      {path: 'collection', component: UserCollectionComponent},
      {path: 'policy-guide', component: PolicyGuideComponent},
      {path: 'log-in', component: LogInComponent},

    ]
  },
  //{ path: 'home', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
