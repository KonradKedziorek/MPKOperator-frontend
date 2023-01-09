import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComplaintRequest } from 'src/app/models/complaint/ComplaintRequest';
import { MethodArgumentNotValidFieldMessage } from 'src/app/models/errors/MethodArgumentNotValidFieldMessage';
import { ComplaintService } from 'src/app/services/complaint/complaint.service';

@Component({
  selector: 'complaint-creator-dialog',
  templateUrl: './complaint-creator-dialog.component.html',
  styleUrls: ['./complaint-creator-dialog.component.css'],
})
export class ComplaintCreatorDialog implements OnInit {
  constructor(
    private complaintService: ComplaintService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.creatorComplaint = new FormGroup({
      dateOfEvent: new FormControl(null),
      timeOfEvent: new FormControl(null),
      placeOfEvent: new FormControl(null),
      description: new FormControl(null),
      nameOfNotifier: new FormControl(null),
      surnameOfNotifier: new FormControl(null),
      peselOfNotifier: new FormControl(null),
      contactToNotifier: new FormControl(null),
    });
  }

  declare creatorComplaint: any;
  declare errors: MethodArgumentNotValidFieldMessage[];
  declare errorMessage: string;

  public closeForm() {
    this.dialog.closeAll();
  }

  public async createComplaint() {
    let creatingUserRequest: ComplaintRequest = {
      dateOfEvent: this.formatDate(this.creatorComplaint.value.dateOfEvent),
      timeOfEvent: this.creatorComplaint.value.timeOfEvent,
      placeOfEvent: this.creatorComplaint.value.placeOfEvent,
      description: this.creatorComplaint.value.description,
      nameOfNotifier: this.creatorComplaint.value.nameOfNotifier,
      surnameOfNotifier: this.creatorComplaint.value.surnameOfNotifier,
      peselOfNotifier: this.creatorComplaint.value.peselOfNotifier,
      contactToNotifier: this.creatorComplaint.value.contactToNotifier,
      uuid: '',
    };

    await this.complaintService
      .createComplaint(creatingUserRequest)
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
