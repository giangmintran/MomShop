import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { WeatherComponent } from './admin-layout/weather/weather.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PTableCustomComponent } from './p-table-custom/p-table-custom.component';
import { AppUserMainComponent } from './app-user-view/app-user-main/app-user-main.component';
import { AppAdminMainComponent } from './app-admin-view/app-admin-main/app-admin-main.component';
import { AppAdminMenuComponent } from './app-admin-view/app-admin-menu/app-admin-menu.component';
import { CreateOrEditWeatherComponent } from './admin-layout/weather/create-or-edit-weather/create-or-edit-weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppAdminManagementUserModule } from './app-admin-view/app-admin-management-user/app-admin-management-user.module';
import { ProductService } from 'src/services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SidebarComponent,
    PTableCustomComponent,
    AppUserMainComponent,
    AppAdminMainComponent,
    AppAdminMenuComponent,
    CreateOrEditWeatherComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,
    AppAdminManagementUserModule,
    //BsModalService,
    //ModalModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
