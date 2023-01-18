import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { FaultRequest } from "src/app/models/fault/FaultRequest";
import { FaultService } from "src/app/services/fault/fault.service";

@Component({
    selector: 'fault-creator-dialog',
    templateUrl: './fault-creator-dialog.component.html',
    styleUrls: ['./fault-creator-dialog.component.css'],
})
export class FaultCreatorDialog implements OnInit {
    constructor(
        private faultService: FaultService,
        private dialog: MatDialog,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.creatorFault = new FormGroup({
            dateOfEvent: new FormControl(null),
            timeOfEvent: new FormControl(null),
            placeOfEvent: new FormControl(null),
            description: new FormControl(null),
            busNumber: new FormControl(null),
        });
    }

    declare creatorFault: any;
    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public closeForm() {
        this.dialog.closeAll();
    }

    public async createFault() {
        let creatingUserRequest: FaultRequest = {
            dateOfEvent: this.formatDate(this.creatorFault.value.dateOfEvent),
            timeOfEvent: this.creatorFault.value.timeOfEvent,
            placeOfEvent: this.creatorFault.value.placeOfEvent,
            description: this.creatorFault.value.description,
            busNumber: this.creatorFault.value.busNumber,
            uuid: '',
        };

        await this.faultService
        .createFault(creatingUserRequest)
        .toPromise()
        .then(() => {
            this.dialog.closeAll();
        })
        .catch((e) => {
            this.errors = e.error.errors;
            this.errorMessage = e.error.message;
        });
    }

    public formatDate(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    public getErrorMessages(fieldName: string): string[] {
        let error = this.errors?.find((o) => o.fieldName === fieldName);
        if (error?.errorMessages != undefined) {
          return error?.errorMessages;
        }
        return [];
    }
}