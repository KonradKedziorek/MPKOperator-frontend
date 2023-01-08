import { Routes } from '@angular/router';

import { ComplaintsComponent } from './complaints/complaints.component';

export const ComponentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ComplaintsComponent,
        data: {
          title: 'Complaints',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Complaints' }],
        },
      },
    ],
  },
];
