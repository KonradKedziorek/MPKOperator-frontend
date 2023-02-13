import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { DriverScheduleComponent } from "./driverSchedules.component";
import { DriverSchedulesRoutes } from "./driverSchedules.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DriverSchedulesRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
      DriverScheduleComponent,
    ],
  })
  export class DriverSchedulesModule {}