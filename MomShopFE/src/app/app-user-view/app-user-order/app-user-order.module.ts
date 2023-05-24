import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserVoteComponent } from './app-user-vote/app-user-vote.component';
import { AppBsModalModule } from 'src/directive/app-bs-modal.module';
import { AppUserOrderDeliveryComponent } from './app-user-order-delivery/app-user-order-delivery.component';



@NgModule({
  declarations: [
    AppUserVoteComponent,
    AppUserOrderDeliveryComponent
  ],
  imports: [
    CommonModule,
    AppBsModalModule,
  ],
  exports:[AppUserVoteComponent]
})
export class AppUserOrderModule { }
