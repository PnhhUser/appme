import { SidebarService } from './../core/services/sidebar.service';
import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, TopBarComponent, SideBarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.less',
})
export class Layout {
  isCollapsed!: Signal<boolean>;

  constructor(private SidebarService: SidebarService) {
    this.isCollapsed = this.SidebarService.collapsed;
  }
}
