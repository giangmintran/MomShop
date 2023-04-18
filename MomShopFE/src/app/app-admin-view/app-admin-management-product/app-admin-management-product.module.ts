import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminManagementProductComponent } from './app-admin-management-product.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppAdminViewDetailProductComponent } from './app-admin-view-detail-product/app-admin-view-detail-product.component';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';
import { CreateOrEditDetailProductComponent } from './create-or-edit-detail-product/create-or-edit-detail-product.component';



@NgModule({
  declarations: [
    AppAdminManagementProductComponent,
    AppAdminViewDetailProductComponent,
    CreateOrEditProductComponent,
    CreateOrEditDetailProductComponent
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
  ],
})
export class AppAdminManagementProductModule { }
