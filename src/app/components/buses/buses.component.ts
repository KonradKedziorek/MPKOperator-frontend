import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Bus } from "src/app/models/bus/Bus";
import { BusService } from "src/app/services/bus/bus.service";
import { BusCreatorDialog } from "./creator/bus-creator-dialog.component";
import { BusDialogComponent } from "./editor/bus-dialog.component";

@Component({
    selector: 'buses',
    templateUrl: './buses.component.html',
    styleUrls: ['./buses.component.css'],
})
export class BusesComponent implements OnInit {
    constructor(
        private busService: BusService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.getBuses(this.params, this.page, this.size);
    }

    displayedColumns = [
        'busNumber',
        'mileage',
        'registrationNumber',
        'firstRegistrationDate',
        'insuranceExpiryDate',
        'serviceExpiryDate',
        'busStatus',
        'actions',
    ];
    
    filters = new FormGroup({
        busNumber: new FormControl(null),
        mileage: new FormControl(null),
        registrationNumber: new FormControl(null),
        firstRegistrationDate: new FormControl(null),
        insuranceExpiryDate: new FormControl(null),
        serviceExpiryDate: new FormControl(null),
        busStatus: new FormControl(null),
    });

    params: { [key: string]: string | null } = {};
    size = 10;
    page = 0;
    totalRecords = 0;
    declare buses: Array<Bus>;

    public getBuses(params: any, page: number, size: number) {
        this.busService.getBuses(params, page, size).subscribe(
            (value) => {
                this.buses = value.data;
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
        this.getBuses(this.params, this.page, this.size);
    }

    public filterOnClick() {
        this.params = this.filters.value;

        for(let key in this.params) {
            if (this.params[key] == '') {
                this.params[key] = null;
            }
        }
        this.params['firstRegistrationDate'] = this.formatDate(this.params['firstRegistrationDate']);
        this.params['insuranceExpiryDate'] = this.formatDate(this.params['insuranceExpiryDate']);
        this.params['serviceExpiryDate'] = this.formatDate(this.params['serviceExpiryDate']);

        this.getBuses(this.params, this.page, this.size);
    }

    public handlePaginator(event: any) {
        this.size = event.pageSize;
        this.page = event.pageIndex;
        this.getBuses(this.params, this.page, this.size);
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
        let dialogRef = this.dialog.open(BusDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.getBuses(this.params, this.page, this.size);
        });
    }

    public createBus() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '700px';
        let dialogRef = this.dialog.open(BusCreatorDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.getBuses(this.params, this.page, this.size);
        });
    }

    // public getFault(uuid: String) {
    //     let dialogRef = this.dialog.open(BusDetailsDialog, {
    //       maxWidth: '100vw',
    //       maxHeight: '100vh',
    //       height: '100%',
    //       width: '100%',
    //       panelClass: 'full-screen-modal',
    //       data: uuid,
    //     });
    //     dialogRef.afterClosed().subscribe(() => {
    //       this.getBuses(this.params, this.page, this.size);
    //     });
    // }

    public onSearchChange(): void {
        this.filterOnClick();
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