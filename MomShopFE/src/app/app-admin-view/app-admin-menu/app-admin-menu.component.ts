import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './app-admin-menu.component.html',
  styleUrls: ['./app-admin-menu.component.scss']
})
export class AppAdminMenuComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
