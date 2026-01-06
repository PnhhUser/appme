import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { DASHBOARD_ROUTE } from '../../core/const/routes.const';

export const dashboardRoute: Routes = [
  {
    path: DASHBOARD_ROUTE,
    component: DashboardPage,
  },
];
