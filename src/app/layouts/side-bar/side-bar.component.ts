import { Component, Signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SidebarService } from '../../core/services/sidebar.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface IMenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: IMenuItem[];
}

@Component({
  selector: 'app-side-bar',
  imports: [
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.less',
})
export class SideBarComponent {
  isCollapsed!: Signal<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.isCollapsed = this.sidebarService.collapsed;
  }

  menuItems: IMenuItem[] = [
    {
      label: 'Tổng quan',
      icon: 'appstore',
      route: '/dashboard',
    },
    {
      label: 'Dữ liệu',
      icon: 'database',
      children: [
        {
          label: 'Sản phẩm',
          route: '/product',
        },
        {
          label: 'Loại sản phẩm',
          route: '/product-type',
        },
      ],
    },
    {
      label: 'Lịch sử giao dịch',
      icon: 'history',
      route: '/transaction-history',
    },
  ];
}
