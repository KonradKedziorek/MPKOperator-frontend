import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { UserRequest } from "src/app/models/user/UserRequest";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'user-creator-dialog',
    templateUrl: './user-creator-dialog.component.html',
    styleUrls: ['./user-creator-dialog.component.css'],
})
export class UserCreatorDialog implements OnInit {
    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.creatorUser = new FormGroup({
            name: new FormControl(null),
            surname: new FormControl(null),
            email: new FormControl(null),
            pesel: new FormControl(null),
            phoneNumber: new FormControl(null),
            city: new FormControl(null),
            postcode: new FormControl(null),
            street: new FormControl(null),
            localNumber: new FormControl(null),
            houseNumber: new FormControl(null),
            isActive: new FormControl(null),
            busNumber: new FormControl(null),
            roles: new FormControl(null),
        });
    }

    declare creatorUser: any;
    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;
    isActiveOptions: string[] = ['true', 'false'];
    ADMIN = "ADMIN"
    DISPATCHER = "DISPATCHER"
    DRIVER = "ADMIN"
    USER = "USER"
    EXAMPLE = "EXAMPLE"
    TEST = "TEST"

    public closeForm() {
        this.dialog.closeAll();
    }

    public async createUser() {
        let creatingUserRequest: UserRequest = {
            name: this.creatorUser.value.name,
            surname: this.creatorUser.value.surname,
            email: this.creatorUser.value.email,
            pesel: this.creatorUser.value.pesel,
            phoneNumber: this.creatorUser.value.phoneNumber,
            city: this.creatorUser.value.city,
            postcode: this.creatorUser.value.postcode,
            street: this.creatorUser.value.street,
            localNumber: this.creatorUser.value.localNumber,
            houseNumber: this.creatorUser.value.houseNumber,
            isActive: this.creatorUser.value.isActive,
            busNumber: this.creatorUser.value.busNumber,
            roles: this.creatorUser.value.roles,
            uuid: '',
        };

        await this.userService
        .createUser(creatingUserRequest)
        .toPromise()
        .then(() => {
            this.dialog.closeAll();
        })
        .catch((e) => {
            console.log(creatingUserRequest)
            this.errors = e.error.errors;
            this.errorMessage = e.error.message;
        });
    }

    public getErrorMessages(fieldName: string): string[] {
        let error = this.errors?.find((o) => o.fieldName === fieldName);
        if (error?.errorMessages != undefined) {
          return error?.errorMessages;
        }
        return [];
    }
}