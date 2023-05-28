import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './app-admin-menu.component.html',
  styleUrls: ['./app-admin-menu.component.scss']
})
export class AppAdminMenuComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route:Router){}
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  ClickMenu(option){
    var menuItem = document.querySelectorAll(".item");
    var menuActive = document.getElementsByClassName("active")[0];
    menuActive?.classList.remove("active");
    menuItem?.forEach((item)=>{
       item?.addEventListener("click",function(){
         item.classList.add("active");
       })
    })
    if(option == 1){
      this.route.navigateByUrl("admin/customer");
    }
    if(option == 2){
      this.route.navigateByUrl("admin/product-management/product");
    }
    if(option == 3){
      this.route.navigateByUrl("admin/order-management/order");
    }
    if(option == 4){
      this.route.navigateByUrl("admin/received-order/order");
    }
    if(option == 5){
      this.route.navigateByUrl("admin/feedback");
    }
    if(option == 6){
      this.route.navigateByUrl("admin/collection-management/collection");
    }
  }
}
