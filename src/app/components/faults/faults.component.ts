import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Fault } from "src/app/models/fault/Fault";
import { FaultService } from "src/app/services/fault/fault.service";

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
        'faultStatus',
        'busNumber',
        'actions',
    ];
    
    filters = new FormGroup({
        date: new FormControl(null),
        placeOfEvent: new FormControl(null),
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

    // TODO: edit, createFault, getFault

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