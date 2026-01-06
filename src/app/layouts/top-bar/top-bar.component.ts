import { Component, Signal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NzAvatarModule, NzDropDownModule, NzIconModule, NzButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.less',
})
export class TopBarComponent {
  readonly firstLetterName: string = 'H';

  isCollapsed!: Signal<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.isCollapsed = this.sidebarService.collapsed;
  }

  toggleCollapsed() {
    this.sidebarService.toggle();
  }
}
