import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { FaultCreatorDialog } from "./creator/fault-creator-dialog.component";
import { FaultDetailsDialog } from "./details/fault-details-dialog.component";
import { FaultDialogComponent } from "./editor/fault-dialog.component";
import { FaultsComponent } from "./faults.component";
import { FaultsRoutes } from "./faults.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(FaultsRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
      FaultCreatorDialog,
      FaultDetailsDialog,
      FaultDialogComponent,
      FaultsComponent,
    ],
  })
  export class FaultsModule {}