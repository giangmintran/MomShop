import { AppAdminMenuComponent } from "./app/app-admin-view/app-admin-menu/app-admin-menu.component";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app/app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppBsModalModule } from "./directive/app-bs-modal.module";
import { AppAdminMangementCustomerModule } from "./app/app-admin-view/app-admin-mangement-customer/app-admin-mangement-customer.module";
import { AppAdminFeedbackUserModule } from "./app/app-admin-view/app-admin-feedback-user/app-admin-feedback-user.module";
import { AppAdminManagementImportProductModule } from "./app/app-admin-view/app-admin-management-import-product/app-admin-management-import-product.module";
import { CalendarModule } from 'primeng/calendar';
import { AdminManagementCollectionModule } from "./app/app-admin-view/admin-management-collection/admin-managment-collection.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppAdminManagementProductModule } from "./app/app-admin-view/app-admin-management-product/app-admin-management-product.module";
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule  } from 'primeng/radiobutton';

@NgModule({
  declarations: [AppAdminMenuComponent],
  imports: [
    AppRoutingModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastrModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,
    CalendarModule,
    AppAdminMangementCustomerModule,
    AppAdminFeedbackUserModule,
    AppAdminManagementImportProductModule,
    AdminManagementCollectionModule,
    AppAdminManagementProductModule,
    CardModule,
    RouterModule,
    DataViewModule, 
    TagModule,
    RatingModule,
    PaginatorModule,
    RadioButtonModule 
  ],
  exports: [AppAdminMenuComponent,
    CardModule,
    RouterModule,
    DataViewModule, 
    TagModule,
    RatingModule,
    PaginatorModule,
    FieldsetModule,
    DialogModule,
    RadioButtonModule  ],
}) 
export class SharedModule {}
