import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { ScheduleComponent } from "./schedules.component";
import { SchedulesRoutes } from "./schedules.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SchedulesRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
      ScheduleComponent,
    ],
  })
  export class SchedulesModule {}