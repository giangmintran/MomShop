import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminMangementCustomerComponent } from './app-admin-mangement-customer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { SharedModule } from 'src/share.module';



@NgModule({
  declarations: [
    AppAdminMangementCustomerComponent,
    CreateOrEditCustomerComponent,
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
    SharedModule
  ]
})
export class AppAdminMangementCustomerModule { }
