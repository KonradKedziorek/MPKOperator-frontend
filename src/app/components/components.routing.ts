import { Routes } from '@angular/router';
import { Dashboard1Component } from '../dashboards/dashboard1/dashboard1.component';

import { ComplaintsComponent } from './complaints/complaints.component';

export const ComponentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ComplaintsComponent,
        data: {
          title: 'Complaints',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Complaints' }],
        },
      },
      {
        path: '',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }],
        },
      },
    ],
  },
];
