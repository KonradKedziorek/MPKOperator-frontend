import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Fault } from "src/app/models/fault/Fault";
import { FaultService } from "src/app/services/fault/fault.service";
import { FaultCreatorDialog } from "./creator/fault-creator-dialog.component";
import { FaultDetailsDialog } from "./details/fault-details-dialog.component";
import { FaultDialogComponent } from "./editor/fault-dialog.component";

@Component({
    selector: 'faults',
    templateUrl: './faults.component.html',
    styleUrls: ['./faults.component.css'],
})
export class FaultsComponent implements OnInit {
    constructor(
        private faultService: FaultService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.getFaults(this.params, this.page, this.size);
    }

    displayedColumns = [
        'dateOfEvent',
        'placeOfEvent',
        'busNumber',
        'faultStatus',
        'actions',
    ];
    
    filters = new FormGroup({
        date: new FormControl(null),
        placeOfEvent: new FormControl(null),
        createdBy: new FormControl(null),
        faultStatus: new FormControl(null),
        busNumber: new FormControl(null),
    });

    params: { [key: string]: string | null } = {};
    size = 10;
    page = 0;
    totalRecords = 0;
    declare faults: Array<Fault>;

    public getFaults(params: any, page: number, size: number) {
        this.faultService.getFaults(params, page, size).subscribe(
            (value) => {
                this.faults = value.data;
                this.totalRecords = value.size;
            },
            (error) => {
                console.log(error);
            },
        );
    }

    public reset() {
        this.filters.reset();
        this.params = {};
        this.page = 0;
        this.size - 10;
        this.getFaults(this.params, this.page, this.size);
    }

    public filterOnClick() {
        this.params = this.filters.value;

        for(let key in this.params) {
            if (this.params[key] == '') {
                this.params[key] = null;
            }
        }
        this.params['date'] = this.formatDate(this.params['date']);

        this.getFaults(this.params, this.page, this.size);
    }

    public handlePaginator(event: any) {
        this.size = event.pageSize;
        this.page = event.pageIndex;
        this.getFaults(this.params, this.page, this.size);
    } 

    public formatDate(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    
      public formatDateTime(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    }

    public edit(user: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '700px';
        dialogConfig.data = user;
        let dialogRef = this.dialog.open(FaultDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.getFaults(this.params, this.page, this.size);
        });
    }

    public createFault() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '700px';
        let dialogRef = this.dialog.open(FaultCreatorDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.getFaults(this.params, this.page, this.size);
        });
    }

    public getFault(uuid: String) {
        let dialogRef = this.dialog.open(FaultDetailsDialog, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'full-screen-modal',
          data: uuid,
        });
        dialogRef.afterClosed().subscribe(() => {
          this.getFaults(this.params, this.page, this.size);
        });
    }

    public onSearchChange(): void {
        this.filterOnClick();
    }

    public statuses: any[] = [
        {
          status: 'REPORTED',
        },
        {
          status: 'CHECKING',
        },
        {
          status: 'WAITING_FOR_CAR_PARTS',
        },
        {
          status: 'FIXING_IN_PROGRESS',
        },
        {
          status: 'SUSPENDED',
        },
        {
          status: 'FINISHED',
        },
    ];
}