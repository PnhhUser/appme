import { Routes } from '@angular/router';
import { Layout } from './layouts/layout';
import { dashboardRoute } from './pages/dashboard/dashboard.routes';
import { productRoute } from './pages/product/product.routes';
import { productTypeRoute } from './pages/product-type/product-type.route';
import { transactionHistoryRoute } from './pages/transaction-history/transaction-history.route';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: Layout,
    children: [
      ...dashboardRoute,
      ...productRoute,
      ...productTypeRoute,
      ...transactionHistoryRoute,
    ],
  },
];
