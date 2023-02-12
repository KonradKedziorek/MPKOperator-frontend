import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ScheduleResponse } from "src/app/models/schedule/ScheduleResponse";
import { ScheduleService } from "src/app/services/schedule/schedule.service";

@Component({
    selector: 'schedules',
    templateUrl: './schedules.component.html',
    styleUrls: ['./schedules.component.css'],
})
export class ScheduleComponent implements OnInit {
    constructor(
        private scheduleService: ScheduleService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
        private sanitizer: DomSanitizer,
    ) {}
    ngOnInit(): void {
        this.getSchedules("DISPATCHER_SCHEDULE");
        this.openFile();
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
                console.log(this.schedules)
            },
            (error) => {
                console.log(error);
            },
        );
    }

    // public handlePaginator(event: any) {
    //     this.size = event.pageSize;
    //     this.page = event.pageIndex;
    //     this.getFaults(this.params, this.page, this.size);
    // } 

    public formatDate(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    
      public formatDateTime(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    }

    public openFile() {
        this.scheduleService.getFileByPath().subscribe(
          (value: any) => {
              var file = new Blob([value], { type: 'image/jpeg' });
              var fileURL = URL.createObjectURL(file);
              this.image = this.sanitizer.bypassSecurityTrustUrl(fileURL);
          },
          (error) => {
            console.log(error);
            var errorMessage = error.error.details;
          }
        );
      }

    // public edit(user: any) {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.width = '700px';
    //     dialogConfig.data = user;
    //     let dialogRef = this.dialog.open(FaultDialogComponent, dialogConfig);
    //     dialogRef.afterClosed().subscribe(() => {
    //       this.getFaults(this.params, this.page, this.size);
    //     });
    // }

    // public createFault() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.width = '700px';
    //     let dialogRef = this.dialog.open(FaultCreatorDialog, dialogConfig);
    //     dialogRef.afterClosed().subscribe(() => {
    //         this.getFaults(this.params, this.page, this.size);
    //     });
    // }

    // public getFault(uuid: String) {
    //     let dialogRef = this.dialog.open(FaultDetailsDialog, {
    //       maxWidth: '100vw',
    //       maxHeight: '100vh',
    //       height: '100%',
    //       width: '100%',
    //       panelClass: 'full-screen-modal',
    //       data: uuid,
    //     });
    //     dialogRef.afterClosed().subscribe(() => {
    //       this.getFaults(this.params, this.page, this.size);
    //     });
    // }
}