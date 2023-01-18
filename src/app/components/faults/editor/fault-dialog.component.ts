import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { Fault } from "src/app/models/fault/Fault";
import { FaultRequest } from "src/app/models/fault/FaultRequest";
import { FaultService } from "src/app/services/fault/fault.service";

@Component({
    selector: 'fault-dialog-component',
    templateUrl: './fault-dialog.component.html',
    styleUrls: ['./fault-dialog.component.css'],
})
export class FaultDialogComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private faultService: FaultService,
        @Inject(MAT_DIALOG_DATA) data: Fault,
    ) {
        if (data !== null) {
          this.fault = {
            uuid: data.uuid,
            dateOfEvent: this.formatDate(data.dateOfEvent),
            timeOfEvent: this.formatTime(data.dateOfEvent),
            placeOfEvent: data.placeOfEvent,
            description: data.description,
            busNumber: data.busNumber,
          };
        }
    }

    ngOnInit(): void {
        this.editFault = new FormGroup({
            uuid: new FormControl(this.fault.uuid),
            dateOfEvent: new FormControl(this.fault.dateOfEvent),
            timeOfEvent: new FormControl(this.fault.timeOfEvent),
            placeOfEvent: new FormControl(this.fault.placeOfEvent),
            description: new FormControl(this.fault.description),
            busNumber: new FormControl(this.fault.busNumber),
        });
    }

    declare fault: FaultRequest;
    declare editFault: any;

    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public async edit() {
        let FaultRequest: FaultRequest = this.editFault.value;
        await this.faultService
        .createFault(FaultRequest)
        .toPromise()
        .then(() => {
            this.dialog.closeAll();
        })
        .catch((e) => {
            this.errors = e.error.errors;
            this.errorMessage = e.error.message;
        });
    }

    public closeForm() {
        this.dialog.closeAll();
    }
    
    public formatDate(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    
    public formatTime(date: any) {
        return this.datePipe.transform(date, 'HH:mm:ss');
    }
    
    public getErrorMessages(fieldName: string): string[] {
        let error = this.errors?.find((o) => o.fieldName === fieldName);
        if (error?.errorMessages != undefined) {
          return error?.errorMessages;
        }
        return [];
    }
}