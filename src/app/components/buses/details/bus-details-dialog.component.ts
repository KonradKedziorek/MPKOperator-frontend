import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BusDetailsResponse } from "src/app/models/bus/BusDetailsResponse";
import { UserBusResponse } from "src/app/models/user/UserBusResponse";
import { BusService } from "src/app/services/bus/bus.service";

@Component({
  selector: 'bus-details-dialog-component',
  templateUrl: './bus-details-dialog.component.html',
  styleUrls: ['./bus-details-dialog.component.scss'],
})
export class BusDetailsDialog implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private busService: BusService,
        @Inject(MAT_DIALOG_DATA) data: String,
    ) {
        if (data !== null) {
          this.uuid = data;
          this.getDetails(data);
        }
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            name: new FormControl(null),
            surname: new FormControl(null),
            phoneNumber: new FormControl(null),
        });
    }
    
  declare userForm: any;
  declare uuid: String;

  declare bus: BusDetailsResponse;
  declare users?: Array<UserBusResponse>;

  public getDetails(uuid: String) {
    this.busService.getBus(uuid).subscribe(
      (value) => {
        this.bus = value;
        this.users = value.users;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.busStatus;
        });
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

  public async changeStatus(uuid: String, status: String) {
    this.busService.changeStatus(uuid, status).subscribe(
      (value) => {
        this.bus = value;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.busStatus;
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public statuses: any[] = [
    {
      status: 'NOT_READY_TO_DRIVE',
    },
    {
      status: 'READY_TO_DRIVE',
    },
    {
      status: 'IN_USE',
    },
    {
      status: 'REPORTED_TO_REPAIR',
    },
    {
      status: 'UNDER_REPAIR',
    },
];
}