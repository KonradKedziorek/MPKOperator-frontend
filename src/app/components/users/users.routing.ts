import { Routes } from "@angular/router";
import { UsersComponent } from "./users.component";

export const UsersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: UsersComponent,
                data: {
                  title: 'Users',
                  urls: [{ title: 'Users', url: '/users' }, { title: 'Users' }],
                },
              },
        ]
    }
]