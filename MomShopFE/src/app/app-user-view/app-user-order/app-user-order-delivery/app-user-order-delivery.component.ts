import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-app-user-order-delivery',
  templateUrl: './app-user-order-delivery.component.html',
  styleUrls: ['./app-user-order-delivery.component.scss']
})
export class AppUserOrderDeliveryComponent {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  show() {
    this.modal.show();
  }
  close() {
    this.modal.hide();
  }
  updateVisalizeStatusVod(statusId) {
    let progress = document.querySelector<HTMLElement>(".vod-progress-visualize");
    let progressColor = document.querySelector<HTMLElement>(".vod-progress-color");
    progressColor.style.width = "0px";
    let block_process = document.querySelectorAll<HTMLElement>(".block-icon")
    let text_block = document.querySelectorAll<HTMLElement>(".text-block")

    for (let i = 0; i < 5; i++) {
      if (i <= statusId - 2) {
        block_process[i].style.backgroundColor = "#efcd9f";
        block_process[i].style.border = "1px solid #cf6439"
        text_block[i].style.color = "red"
      }
      else {
        block_process[i].style.backgroundColor = 'white'
        block_process[i].style.border = "1px solid #ccc"
        text_block[i].style.color = 'gray';
      }
    }
    let size = (progress.offsetWidth / 4) * (statusId - 2);
    progressColor.style.width = size + "px";
  }
}
