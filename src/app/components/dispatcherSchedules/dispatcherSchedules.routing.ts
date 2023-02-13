import { Routes } from "@angular/router";
import { DispatcherScheduleComponent } from "./dispatcherSchedules.component";

export const DispatcherSchedulesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DispatcherScheduleComponent,
                data: {
                  title: 'Dispatcher schedules',
                  urls: [{ title: 'Dispatcher schedules', url: '/schedules/name=' }, { title: 'Dispatcher schedules' }],
                },
              },
        ]
    }
]