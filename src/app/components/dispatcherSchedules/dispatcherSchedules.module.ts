import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { DispatcherScheduleComponent } from "./dispatcherSchedules.component";
import { DispatcherSchedulesRoutes } from "./dispatcherSchedules.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DispatcherSchedulesRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
      DispatcherScheduleComponent,
    ],
  })
  export class DispatcherSchedulesModule {}