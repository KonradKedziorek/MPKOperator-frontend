import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Complaint } from 'src/app/models/complaint/Complaint';
import { ComplaintRequest } from 'src/app/models/complaint/ComplaintRequest';
import { MethodArgumentNotValidFieldMessage } from 'src/app/models/errors/MethodArgumentNotValidFieldMessage';

import { ComplaintService } from 'src/app/services/complaint/complaint.service';
@Component({
  selector: 'complaint-dialog-component',
  templateUrl: './complaint-dialog.component.html',
  styleUrls: ['./complaint-dialog.component.css'],
})
export class ComplaintDialogComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private complaintService: ComplaintService,
    @Inject(MAT_DIALOG_DATA) data: Complaint,
  ) {
    if (data !== null) {
      this.complaint = {
        uuid: data.uuid,
        dateOfEvent: this.formatDate(data.dateOfEvent),
        timeOfEvent: this.formatTime(data.dateOfEvent),
        placeOfEvent: data.placeOfEvent,
        nameOfNotifier: data.nameOfNotifier,
        surnameOfNotifier: data.surnameOfNotifier,
        peselOfNotifier: data.peselOfNotifier,
        description: data.description,
        contactToNotifier: data.contactToNotifier,
      };
    }
  }

  ngOnInit(): void {
    this.editComplaint = new FormGroup({
      uuid: new FormControl(this.complaint.uuid),
      dateOfEvent: new FormControl(this.complaint.dateOfEvent),
      timeOfEvent: new FormControl(this.complaint.timeOfEvent),
      placeOfEvent: new FormControl(this.complaint.placeOfEvent),
      nameOfNotifier: new FormControl(this.complaint.nameOfNotifier),
      surnameOfNotifier: new FormControl(this.complaint.surnameOfNotifier),
      peselOfNotifier: new FormControl(this.complaint.peselOfNotifier),
      description: new FormControl(this.complaint.description),
      contactToNotifier: new FormControl(this.complaint.contactToNotifier),
    });
  }

  declare complaint: ComplaintRequest;
  declare editComplaint: any;

  declare errors: MethodArgumentNotValidFieldMessage[];
  declare errorMessage: string;

  public async edit() {
    let ComplaintRequest: ComplaintRequest = this.editComplaint.value;
    await this.complaintService
      .createComplaint(ComplaintRequest)
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
