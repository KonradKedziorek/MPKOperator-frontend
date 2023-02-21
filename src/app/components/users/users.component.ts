import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { User } from "src/app/models/user/User";
import { UserService } from "src/app/services/user/user.service";
import { UserCreatorDialog } from "./creator/user-creator-dialog.component";
import { UserDetailsDialog } from "./details/user-details-dialog.component";
import { UserDialogComponent } from "./editor/user-dialog.component";
import { UserMailSenderDialog } from "./mailSender/user-mailSender-dialog.component";

@Component({
    selector: 'Users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    constructor(
        private userService: UserService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.getUsers(this.params, this.page, this.size);
    }

    displayedColumns = [
        'name',
        'surname',
        'username',
        'email',
        'phoneNumber',
        'isActive',
        'actions',
    ];
    
    filters = new FormGroup({
        name: new FormControl(null),
        surname: new FormControl(null),
        username: new FormControl(null),
        email: new FormControl(null),
        pesel: new FormControl(null),
        phoneNumber: new FormControl(null),
    });

    params: { [key: string]: string | null } = {};
    size = 10;
    page = 0;
    totalRecords = 0;
    declare users: Array<User>;

    public getUsers(params: any, page: number, size: number) {
        this.userService.getUsers(params, page, size).subscribe(
            (value) => {
                console.log(value.data);
                this.users = value.data;
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
        this.getUsers(this.params, this.page, this.size);
    }

    public filterOnClick() {
        this.params = this.filters.value;

        for(let key in this.params) {
            if (this.params[key] == '') {
                this.params[key] = null;
            }
        }

        this.getUsers(this.params, this.page, this.size);
    }

    public handlePaginator(event: any) {
        this.size = event.pageSize;
        this.page = event.pageIndex;
        this.getUsers(this.params, this.page, this.size);
    }

    public edit(user: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '700px';
        dialogConfig.data = user;
        let dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.getUsers(this.params, this.page, this.size);
        });
    }

    public createUser() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '700px';
        let dialogRef = this.dialog.open(UserCreatorDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.getUsers(this.params, this.page, this.size);
        });
    }

    public createMail(uuid: string) {
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.width = '700px';
        let dialogRef = this.dialog.open(UserMailSenderDialog, {
            data: uuid,
            maxWidth: '50vw',
            maxHeight: '70vh',
            width: "700px",
            height: '800px',
            panelClass: 'custom-modalbox',
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getUsers(this.params, this.page, this.size);
        });
    }

    public getUser(uuid: String) {
        let dialogRef = this.dialog.open(UserDetailsDialog, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'full-screen-modal',
          data: uuid,
        });
        dialogRef.afterClosed().subscribe(() => {
          this.getUsers(this.params, this.page, this.size);
        });
    }

    public onSearchChange(): void {
        this.filterOnClick();
    }
}