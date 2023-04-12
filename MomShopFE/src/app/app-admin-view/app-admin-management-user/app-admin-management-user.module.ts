import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminManagementUserComponent } from './app-admin-management-user.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppAdminManagementUserComponent,
    CreateOrEditUserComponent
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
export class AppAdminManagementUserModule { }
