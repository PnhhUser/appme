import { Component, Signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SidebarService } from '../../core/services/sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [NzMenuModule, NzIconModule, NzToolTipModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.less',
})
export class SideBarComponent {
  isCollapsed!: Signal<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.isCollapsed = this.sidebarService.collapsed;
  }
}
