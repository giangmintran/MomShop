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
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SidebarComponent,
    PTableCustomComponent,
    AppUserMainComponent,
    AppAdminMainComponent,
    CreateOrEditWeatherComponent,
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
    ToastrModule.forRoot({
      positionClass :'toast-top-right',
    }),
    AppAdminManagementProductModule
    //BsModalService,
    //ModalModule
  ],
  providers: [
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
