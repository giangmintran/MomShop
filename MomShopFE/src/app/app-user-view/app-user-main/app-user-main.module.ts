import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppUserMainComponent } from './app-user-main.component';
import { UserCollectionComponent } from '../user-collection/user-collection.component';
import { UserIntroComponent } from '../user-intro/user-intro.component';
import { LogInComponent } from '../log-in/log-in.component';
import { PolicyGuideComponent } from '../policy-guide/policy-guide.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AppUserMainComponent,
    UserCollectionComponent,
    UserIntroComponent,
    LogInComponent,
    PolicyGuideComponent
    
  ],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastrModule,
    CardModule,
    RouterModule,
    DataViewModule, 
    TagModule,
    RatingModule,
    PaginatorModule
  ],
})
export class AppUserViewModule { }
