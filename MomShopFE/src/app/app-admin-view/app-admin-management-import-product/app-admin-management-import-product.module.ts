import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminManagementImportProductComponent } from './app-admin-management-import-product.component';
import { CreatOrEditImportProductComponent } from './creat-or-edit-import-product/creat-or-edit-import-product.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';



@NgModule({
  declarations: [
    AppAdminManagementImportProductComponent,
    CreatOrEditImportProductComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastrModule,
  ]
})
export class AppAdminManagementImportProductModule { }
