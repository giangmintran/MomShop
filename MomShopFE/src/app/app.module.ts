import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { SharedModule } from 'src/share.module';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { CreateOrEditWeatherComponent } from './admin-layout/weather/create-or-edit-weather/create-or-edit-weather.component';
import { WeatherComponent } from './admin-layout/weather/weather.component';
import { AppAdminMainComponent } from './app-admin-view/app-admin-main/app-admin-main.component';
import { AppAdminManagementProductModule } from './app-admin-view/app-admin-management-product/app-admin-management-product.module';
import { AppRoutingModule } from './app-routing.module';
import { AppUserMainComponent } from './app-user-view/app-user-main/app-user-main.component';
import { AppComponent } from './app.component';
import { PTableCustomComponent } from './p-table-custom/p-table-custom.component';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { CreateOrEditProductDetailTestComponent } from './app-admin-view/app-admin-management-product/create-or-edit-product-detail-test/create-or-edit-product-detail-test.component';
import { CreateOrEditProductTestComponent } from './app-admin-view/app-admin-management-product/create-or-edit-product-test/create-or-edit-product-test.component';
import { ConfirmationService } from 'primeng/api';
import { NgImageSliderModule } from 'ng-image-slider';
import { LoginComponent } from './app-login/login/login.component';
import { AppHeaderComponent } from './app-user-view/app-header/app-header.component';
import { AppFooterComponent } from './app-user-view/app-footer/app-footer.component';
import { AppUserCartComponent } from './app-user-view/app-user-cart/app-user-cart.component';
import { AppUserRegisterComponent } from './app-user-view/app-user-register/app-user-register.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SidebarComponent,
    PTableCustomComponent,
    AppUserMainComponent,
    AppAdminMainComponent,
    CreateOrEditWeatherComponent,
    LoginComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppUserCartComponent,
    AppUserRegisterComponent,

    //AppAdminMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,
    DropdownModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
		MenuModule,
    FileUploadModule,
    DynamicDialogModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right',
    }),
  ],
  providers: [
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
