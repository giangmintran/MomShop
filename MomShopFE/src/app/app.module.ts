import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './admin-layout/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { TopbarComponent } from './admin-layout/topbar/topbar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MainComponent } from './admin-layout/main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SidebarComponent,
    TopbarComponent,
    AdminHomeComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
