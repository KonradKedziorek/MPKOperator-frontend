import { Routes } from "@angular/router";
import { FaultsComponent } from "./faults.component";

export const FaultsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: FaultsComponent,
                data: {
                  title: 'Faults',
                  urls: [{ title: 'Faults', url: '/faults' }, { title: 'Faults' }],
                },
              },
        ]
    }
]