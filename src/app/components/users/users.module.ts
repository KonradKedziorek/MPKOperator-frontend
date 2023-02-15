import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { UserCreatorDialog } from "./creator/user-creator-dialog.component";
import { UserDetailsDialog } from "./details/user-details-dialog.component";
import { UsersComponent } from "./users.component";
import { UsersRoutes } from "./users.routing";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(UsersRoutes),
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaterialTimepickerModule,
    ],
    declarations: [
        UsersComponent,
        UserCreatorDialog,
        UserDetailsDialog
    ],
  })
  export class UsersModule {}