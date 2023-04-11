import { AppAdminMenuComponent } from "./app/app-admin-view/app-admin-menu/app-admin-menu.component";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app/app-routing.module";

@NgModule({
    declarations: [
        AppAdminMenuComponent
    ],
     imports:[
        AppRoutingModule,
     ],
    exports:[AppAdminMenuComponent]
})
export class SharedModule{}