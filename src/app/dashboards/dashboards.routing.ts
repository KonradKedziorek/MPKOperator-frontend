import { Routes } from '@angular/router';
import { AuthLoggedInGuard } from '../guards/auth/AuthLoggedInGuard';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        canActivate:[AuthLoggedInGuard],
        data: {
          title: 'Dashboard',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }],
        },
      },
    ],
  },
];
