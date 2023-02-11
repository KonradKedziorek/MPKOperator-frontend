import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './dashboards.routing';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

import {
  TopCardComponent,
  SalesOverviewComponent,
  VisitorComponent,
} from './dashboard-components';
import { AuthLoggedInGuard } from '../guards/auth/AuthLoggedInGuard';
import {TableModule} from 'primeng/table';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        FlexLayoutModule,
        ChartistModule,
        ChartsModule,
        NgApexchartsModule,
        RouterModule.forChild(DashboardsRoutes),
        FormsModule,
        ReactiveFormsModule,
        TableModule
    ],
    declarations: [
        Dashboard1Component,
        TopCardComponent,
        SalesOverviewComponent,
        VisitorComponent,
    ],
    providers:[AuthLoggedInGuard]
})
export class DashboardsModule {}
