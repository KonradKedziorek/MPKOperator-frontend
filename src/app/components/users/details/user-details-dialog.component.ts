import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BusDetailsResponse } from "src/app/models/bus/BusDetailsResponse";
import { Role } from "src/app/models/role/Role";
import { UserBusResponse } from "src/app/models/user/UserBusResponse";
import { UserDetailsResponse } from "src/app/models/user/UserDetailsResponse";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'user-details-dialog-component',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.scss'],
})
export class UserDetailsDialog implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) data: String,
    ) {
        if (data !== null) {
          this.uuid = data;
          this.getDetails(data);
        }
    }

    ngOnInit(): void {}
    
  declare uuid: String;

  declare user: UserDetailsResponse;
  declare roles?: Array<Role>;

  public getDetails(uuid: String) {
    this.userService.getUser(uuid).subscribe(
      (value) => {
        this.user = value;
        console.log(this.user)
        this.roles = value.roles;
      },
      (error) => {},
    );
  }

  public closeForm() {
    this.dialog.closeAll();
  }

  public formatDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}