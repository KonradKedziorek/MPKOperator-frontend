import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { BusesComponent } from "./buses.component";
import { BusesRoutes } from "./buses.routing";
import { BusCreatorDialog } from "./creator/bus-creator-dialog.component";
import { BusDialogComponent } from "./editor/bus-dialog.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(BusesRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
        BusCreatorDialog,
        BusDialogComponent,
        BusesComponent,
    ],
  })
  export class BusesModule {}