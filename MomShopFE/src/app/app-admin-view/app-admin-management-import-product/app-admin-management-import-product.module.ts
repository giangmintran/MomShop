import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminManagementImportProductComponent } from './app-admin-management-import-product.component';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';



@NgModule({
  declarations: [
    AppAdminManagementImportProductComponent,
    CreatOrEditImportProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppAdminManagementImportProductModule { }
