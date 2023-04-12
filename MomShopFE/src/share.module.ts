import { AppAdminMenuComponent } from "./app/app-admin-view/app-admin-menu/app-admin-menu.component";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app/app-routing.module";
import { AppAdminFeedbackUserComponent } from "./app/app-admin-view/app-admin-feedback-user/app-admin-feedback-user.component";
import { ToastrModule } from "ngx-toastr";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppBsModalModule } from "./directive/app-bs-modal.module";

@NgModule({
  declarations: [AppAdminMenuComponent],
  imports: [
    AppRoutingModule,
    DropdownModule,
    //InputTextModule,
    ButtonModule,
    ToastrModule,
    TableModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,
    DropdownModule
  ],
  exports: [AppAdminMenuComponent,],
})
export class SharedModule {}
