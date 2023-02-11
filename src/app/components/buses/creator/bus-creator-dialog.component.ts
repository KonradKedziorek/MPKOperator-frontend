import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BusRequest } from "src/app/models/bus/BusRequest";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { BusService } from "src/app/services/bus/bus.service";

@Component({
    selector: 'bus-creator-dialog',
    templateUrl: './bus-creator-dialog.component.html',
    styleUrls: ['./bus-creator-dialog.component.css'],
})
export class BusCreatorDialog implements OnInit {
    constructor(
        private busService: BusService,
        private dialog: MatDialog,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.creatorBus = new FormGroup({
            busNumber: new FormControl(null),
            mileage: new FormControl(null),
            manufactureYear: new FormControl(null),
            registrationNumber: new FormControl(null),
            firstRegistrationDate: new FormControl(null),
            brand: new FormControl(null),
            model: new FormControl(null),
            vin: new FormControl(null),
            maximumTotalMass: new FormControl(null),
            deadWeightLoad: new FormControl(null),
            engineSize: new FormControl(null),
            numberOfSeating: new FormControl(null),
            numberOfStandingRoom: new FormControl(null),
            insuranceExpiryDate: new FormControl(null),
            serviceExpiryDate: new FormControl(null),
        });
    }

    declare creatorBus: any;
    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public closeForm() {
        this.dialog.closeAll();
    }

    public async createBus() {
        let creatingBusRequest: BusRequest = {
            busNumber: this.creatorBus.value.busNumber,
            mileage: this.creatorBus.value.mileage,
            manufactureYear: this.creatorBus.value.manufactureYear,
            registrationNumber: this.creatorBus.value.registrationNumber,
            firstRegistrationDate: this.formatDate(this.creatorBus.value.firstRegistrationDate),
            brand: this.creatorBus.value.brand,
            model:this.creatorBus.value.model,
            vin: this.creatorBus.value.vin,
            maximumTotalMass: this.creatorBus.value.maximumTotalMass,
            deadWeightLoad: this.creatorBus.value.deadWeightLoad,
            engineSize: this.creatorBus.value.engineSize,
            numberOfSeating: this.creatorBus.value.numberOfSeating,
            numberOfStandingRoom: this.creatorBus.value.numberOfStandingRoom,
            insuranceExpiryDate: this.formatDate(this.creatorBus.value.insuranceExpiryDate),
            serviceExpiryDate: this.formatDate(this.creatorBus.value.serviceExpiryDate),
            uuid: '',
        };

        await this.busService
        .createBus(creatingBusRequest)
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

