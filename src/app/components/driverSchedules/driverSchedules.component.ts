import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ScheduleResponse } from "src/app/models/schedule/ScheduleResponse";
import { ScheduleService } from "src/app/services/schedule/schedule.service";

@Component({
    selector: 'driverSchedules',
    templateUrl: './driverSchedules.component.html',
    styleUrls: ['./driverSchedules.component.css'],
})
export class DriverScheduleComponent implements OnInit {
    constructor(
        private scheduleService: ScheduleService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
        private sanitizer: DomSanitizer,
    ) {}
    ngOnInit(): void {
        this.getSchedules("DRIVER_SCHEDULE");
    }

    displayedColumns = [
        'date',
        'name',
        'createdBy',
        'actions',
    ];

    params: { [key: string]: string | null } = {};
    declare schedules: Array<ScheduleResponse>;
    declare image: any;

    public getSchedules(params: string) {
        this.scheduleService.getSchedules(params).subscribe(
            (value) => {
                this.schedules = value;
                if (this.schedules != undefined) {
                    const uuid = this.schedules[0].uuid
                    this.openFile(uuid)
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }

    public formatDate(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    
      public formatDateTime(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    }

    public openFile(uuid: String) {
        console.log(uuid)
        this.scheduleService.getFileByPath(uuid).subscribe(
          (value: any) => {
              var file = new Blob([value], { type: 'image/jpeg' });
              var fileURL = URL.createObjectURL(file);
              this.image = this.sanitizer.bypassSecurityTrustUrl(fileURL);
          },
          (error) => {
            console.log(error);
          }
        );
    }
}