import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { AuthLoggedInGuard } from './guards/auth/AuthLoggedInGuard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
      },
      {
        path: 'complaints',
        loadChildren: () =>
          import('./components/components.module').then((m) => m.ComponentsMondule),
      },
      {
        path: 'faults',
        loadChildren: () =>
          import('./components/components.module').then((m) => m.ComponentsMondule),
      },
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];
