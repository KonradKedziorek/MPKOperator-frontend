import { Routes } from "@angular/router";
import { DriverScheduleComponent } from "./driverSchedules.component";

export const DriverSchedulesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DriverScheduleComponent,
                data: {
                  title: 'Driver schedules',
                  urls: [{ title: 'Driver schedules', url: '/schedules/name=' }, { title: 'Driver schedules' }],
                },
              },
        ]
    }
]