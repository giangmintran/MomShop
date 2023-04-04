import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './admin-layout/weather/weather.component';
import { AppAdminManagementUserComponent } from './app-admin-view/app-admin-management-user/app-admin-management-user.component';
import { PTableCustomComponent } from './p-table-custom/p-table-custom.component';

const routes: Routes = [
  { path: 'user', component: AppAdminManagementUserComponent },
  //{ path: 'home', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
