import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Bus } from "src/app/models/bus/Bus";
import { BusRequest } from "src/app/models/bus/BusRequest";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { BusService } from "src/app/services/bus/bus.service";

@Component({
    selector: 'bus-dialog-component',
    templateUrl: './bus-dialog.component.html',
    styleUrls: ['./bus-dialog.component.css'],
})
export class BusDialogComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private busService: BusService,
        @Inject(MAT_DIALOG_DATA) data: Bus,
    ) {
        if (data !== null) {
          this.bus = {
            uuid: data.uuid,
            busNumber: data.busNumber,
            mileage: data.mileage,
            manufactureYear: data.manufactureYear,
            registrationNumber: data.registrationNumber,
            firstRegistrationDate: this.formatDate(data.firstRegistrationDate),
            brand: data.brand,
            model: data.model,
            VIN: data.VIN,
            maximumTotalMass: data.maximumTotalMass,
            deadWeightLoad: data.deadWeightLoad,
            engineSize: data.engineSize,
            numberOfSeating: data.numberOfSeating,
            numberOfStandingRoom: data.numberOfStandingRoom,
            insuranceExpiryDate: this.formatDate(data.insuranceExpiryDate),
            serviceExpiryDate: this.formatDate(data.serviceExpiryDate),
          };
        }
    }

    ngOnInit(): void {
        this.editBus = new FormGroup({
            uuid: new FormControl(this.bus.uuid),
            busNumber: new FormControl(this.bus.busNumber),
            mileage: new FormControl(this.bus.mileage),
            manufactureYear: new FormControl(this.bus.manufactureYear),
            registrationNumber: new FormControl(this.bus.registrationNumber),
            firstRegistrationDate: new FormControl(this.bus.firstRegistrationDate),
            brand: new FormControl(this.bus.brand),
            model: new FormControl(this.bus.model),
            VIN: new FormControl(this.bus.VIN),
            maximumTotalMass: new FormControl(this.bus.maximumTotalMass),
            deadWeightLoad: new FormControl(this.bus.deadWeightLoad),
            engineSize: new FormControl(this.bus.engineSize),
            numberOfSeating: new FormControl(this.bus.numberOfSeating),
            numberOfStandingRoom: new FormControl(this.bus.numberOfStandingRoom),
            insuranceExpiryDate: new FormControl(this.bus.insuranceExpiryDate),
            serviceExpiryDate: new FormControl(this.bus.serviceExpiryDate),
        });
    }

    declare bus: BusRequest;
    declare editBus: any;

    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public async edit() {
        let BusRequest: BusRequest = this.editBus.value;
        await this.busService
        .createBus(BusRequest)
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
    
    public getErrorMessages(fieldName: string): string[] {
        let error = this.errors?.find((o) => o.fieldName === fieldName);
        if (error?.errorMessages != undefined) {
          return error?.errorMessages;
        }
        return [];
    }
}