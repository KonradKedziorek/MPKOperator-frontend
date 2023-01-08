import { Routes } from '@angular/router';

import { BasicTableComponent } from './basic-table/basic-table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basictable',
        component: BasicTableComponent,
        data: {
          title: 'Basic Table',
          // urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Basic Table' }],
        },
      },
    ],
  },
];
