import { Routes } from "@angular/router";
import { BusesComponent } from "./buses.component";

export const BusesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: BusesComponent,
                data: {
                  title: 'Buses',
                  urls: [{ title: 'Buses', url: '/buses' }, { title: 'Buses' }],
                },
              },
        ]
    }
]