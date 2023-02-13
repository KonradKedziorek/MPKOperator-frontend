import { Routes } from "@angular/router";
import { MechanicScheduleComponent } from "./mechanicSchedules.component";

export const MechanicSchedulesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: MechanicScheduleComponent,
                data: {
                  title: 'Mechanic schedules',
                  urls: [{ title: 'Mechanic schedules', url: '/schedules/name=' }, { title: 'Mechanic schedules' }],
                },
              },
        ]
    }
]