import { Routes } from "@angular/router";
import { ScheduleComponent } from "./schedules.component";

export const SchedulesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ScheduleComponent,
                data: {
                  title: 'Schedules',
                  urls: [{ title: 'Schedules', url: '/schedules/name=' }, { title: 'Schedules' }],
                },
              },
        ]
    }
]