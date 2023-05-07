import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppAdminFeedbackUserComponent } from './app-admin-feedback-user.component';

@NgModule({
  declarations: [AppAdminFeedbackUserComponent],
  imports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastrModule,
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    AppBsModalModule,FormsModule,
  ]
})
export class AppAdminFeedbackUserModule { }
