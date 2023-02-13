import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { MechanicScheduleComponent } from "./mechanicSchedules.component";
import { MechanicSchedulesRoutes } from "./mechanicSchedules.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(MechanicSchedulesRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
      MechanicScheduleComponent,
    ],
  })
  export class MechanicSchedulesModule {}