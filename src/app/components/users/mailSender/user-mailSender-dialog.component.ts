import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MethodArgumentNotValidFieldMessage } from "src/app/models/errors/MethodArgumentNotValidFieldMessage";
import { EmailToUserRequest } from "src/app/models/user/EmailToUserRequest";
import { UserRequest } from "src/app/models/user/UserRequest";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'user-mailSender-dialog',
    templateUrl: './user-mailSender-dialog.component.html',
    styleUrls: ['./user-mailSender-dialog.component.css'],
})
export class UserMailSenderDialog implements OnInit {
    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) data: string,
    ) {
        if (data != null) {
            this.uuid = data;
        }
    }

    ngOnInit(): void {
        this.mailSender = new FormGroup({
            subject: new FormControl(null),
            content: new FormControl(null),
        });
    }

    declare uuid: string;
    declare mailSender: any;
    declare errors: MethodArgumentNotValidFieldMessage[];
    declare errorMessage: string;

    public closeForm() {
        this.dialog.closeAll();
    }

    public async createMail() {
        let creatingMailSendRequest: EmailToUserRequest = {
            subject: this.mailSender.value.subject,
            content: this.mailSender.value.content,
        };

        await this.userService
        .sendMailFromUserData(creatingMailSendRequest, this.uuid)
        .toPromise()
        .then(() => {
            this.dialog.closeAll();
        })
        .catch((e) => {
            console.log(creatingMailSendRequest)
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