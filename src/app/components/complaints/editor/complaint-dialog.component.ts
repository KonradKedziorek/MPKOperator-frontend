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
    console.log(data);
    if (data !== null) {
      this.complaint = {
        uuid: data.uuid,
        dateOfEvent: data.dateOfEvent,
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

  public async edit() {
    let ComplaintRequest: ComplaintRequest = this.editComplaint.value;
    await this.complaintService
      .createComplaint(ComplaintRequest)
      .toPromise()
      .then(() => {
        this.dialog.closeAll();
      })
      .catch((e) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = e.error.details;
      });
  }

  public closeForm() {
    this.dialog.closeAll();
  }

  public formatDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }
}
