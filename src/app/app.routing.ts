import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

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
        // redirectTo: '/complaints',
        loadChildren: () =>
          import('./components/components.module').then((m) => m.ComponentsModule),
      },
      {
        path: 'faults',
        loadChildren: () =>
          import('./components/faults/faults.module').then((m) => m.FaultsModule),
      },
      {
        path: 'buses',
        loadChildren: () =>
          import('./components/buses/buses.module').then((m) => m.BusesModule),
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
