import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminManagementProductComponent } from './app-admin-management-product.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppAdminViewDetailProductComponent } from './app-admin-view-detail-product/app-admin-view-detail-product.component';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';
import { CreateOrEditDetailProductComponent } from './create-or-edit-detail-product/create-or-edit-detail-product.component';
import { MenuModule } from 'primeng/menu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreateOrEditProductTestComponent } from './create-or-edit-product-test/create-or-edit-product-test.component';
import { CreateOrEditProductDetailTestComponent } from './create-or-edit-product-detail-test/create-or-edit-product-detail-test.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppAdminManagementProductComponent,
    AppAdminViewDetailProductComponent,
    CreateOrEditProductComponent,
    CreateOrEditDetailProductComponent,
    CreateOrEditProductTestComponent,
    CreateOrEditProductDetailTestComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ToastrModule,
    MenuModule,
    DynamicDialogModule,
    FileUploadModule,
    ConfirmDialogModule,
    TagModule,
  ],
})
export class AppAdminManagementProductModule { }
