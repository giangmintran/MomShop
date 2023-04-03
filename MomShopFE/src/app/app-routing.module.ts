import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './admin-layout/weather/weather.component';
import { MainComponent } from './admin-layout/main/main.component';

const routes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'home', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
