import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComplaintCreatorDialog } from './complaints/creator/complaint-creator-dialog.component';
import { ComplaintDialogComponent } from './complaints/editor/complaint-dialog.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ComponentRoutes } from './components.routing';
import { ComplaintDetailsDialog } from './complaints/details/complaint-details-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FaultsComponent } from './faults/faults.component';
import { FaultCreatorDialog } from './faults/creator/fault-creator-dialog.component';
import { FaultDialogComponent } from './faults/editor/fault-dialog.component';
import { FaultDetailsDialog } from './faults/details/fault-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
  ],
  declarations: [
    ComplaintCreatorDialog,
    ComplaintDialogComponent,
    ComplaintsComponent,
    ComplaintDetailsDialog,
    FaultCreatorDialog,
    FaultDetailsDialog,
    FaultDialogComponent,
    FaultsComponent,
  ],
})
export class ComponentsModule {}
