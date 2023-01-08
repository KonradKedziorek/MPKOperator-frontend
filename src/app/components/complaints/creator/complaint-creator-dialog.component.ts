import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComplaintRequest } from 'src/app/models/complaint/ComplaintRequest';
import { ComplaintService } from 'src/app/services/complaint/complaint.service';

@Component({
  selector: 'complaint-creator-dialog',
  templateUrl: './complaint-creator-dialog.component.html',
  styleUrls: ['./complaint-creator-dialog.component.css'],
})
export class ComplaintCreatorDialog implements OnInit {
  constructor(private complaintService: ComplaintService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.creatorComplaint = new FormGroup({
      dateOfEvent: new FormControl(null),
      placeOfEvent: new FormControl(null),
      description: new FormControl(null),
      nameOfNotifier: new FormControl(null),
      surnameOfNotifier: new FormControl(null),
      peselOfNotifier: new FormControl(null),
      contactToNotifier: new FormControl(null),
    });
  }

  declare creatorComplaint: any;

  public closeForm() {
    this.dialog.closeAll();
  }

  public async createComplaint() {
    let creatingUserRequest: ComplaintRequest = {
      dateOfEvent: this.creatorComplaint.value.dateOfEvent,
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
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = e.error.details;
      });
  }
}
