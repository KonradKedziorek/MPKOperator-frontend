import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { UpdateUserDataByAdminRequest } from "src/app/models/user/UpdateUserDataByAdminRequest";
import { User } from "src/app/models/user/User";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'user-dialog-component',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) data: User,
    ) {
        if (data !== null) {
            console.log(data)
          this.user = {
            uuid: data.uuid,
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            password: data.password,
            pesel: data.pesel,
            phoneNumber: data.phoneNumber,
            city: data.city,
            postcode: data.postcode,
            street: data.street,
            localNumber: data.localNumber,
            houseNumber: data.houseNumber,
            isActive: data.isActive,
            busNumber: data.busNumber,
            roles: data.roles,
          };
        }
        console.log(this.user)
    }

    ngOnInit(): void {
        this.editUser = new FormGroup({
            uuid: new FormControl(this.user.uuid),
            name: new FormControl(this.user.name),
            surname: new FormControl(this.user.surname),
            username: new FormControl(this.user.username),
            email: new FormControl(this.user.email),
            password: new FormControl(this.user.password),
            pesel: new FormControl(this.user.pesel),
            phoneNumber: new FormControl(this.user.phoneNumber),
            city: new FormControl(this.user.city),
            postcode: new FormControl(this.user.postcode),
            street: new FormControl(this.user.street),
            localNumber: new FormControl(this.user.localNumber),
            houseNumber: new FormControl(this.user.houseNumber),
            isActive: new FormControl(this.user.isActive),
            roles: new FormControl(this.user.roles),
            busNumber: new FormControl(this.user.busNumber),
        });
    }

    declare user: UpdateUserDataByAdminRequest;
    declare editUser: any;
    isActiveOptions: string[] = ['true', 'false'];

    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public async edit() {
        let UpdateUserDataByAdminRequest: UpdateUserDataByAdminRequest = this.editUser.value;
        await this.userService
        .editUser(UpdateUserDataByAdminRequest, this.user.uuid)
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