import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentReply } from 'src/app/models/comment/CommentReply';
import { CommentRequest } from 'src/app/models/comment/CommentRequest';
import { CommentResponse } from 'src/app/models/comment/CommentResponse';
import { ComplaintDetailsResponse } from 'src/app/models/complaint/ComplaintDetailsResponse';

import { ComplaintService } from 'src/app/services/complaint/complaint.service';
@Component({
  selector: 'complaint-details-dialog-component',
  templateUrl: './complaint-details-dialog.component.html',
  styleUrls: ['./complaint-details-dialog.component.css'],
})
export class ComplaintDetailsDialog implements OnInit {
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private complaintService: ComplaintService,
    @Inject(MAT_DIALOG_DATA) data: String,
  ) {
    console.log(data);
    if (data !== null) {
      this.uuid = data;
      this.getDetails(data);
    }
  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(null),
    });
  }

  declare commentForm: any;
  declare uuid: String;

  declare complaint: ComplaintDetailsResponse;
  declare comments?: Array<CommentResponse>;

  public getDetails(uuid: String) {
    this.complaintService.getComplaint(uuid).subscribe(
      (value) => {
        this.complaint = value;
        this.comments = value.comments;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public closeForm() {
    this.dialog.closeAll();
  }

  public formatDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  public async reply() {
    let commentRequest: CommentRequest = {
      content: this.commentForm.value.content,
    };
    await this.complaintService
      .addComment(commentRequest, this.complaint.uuid)
      .toPromise()
      .then((value) => {
        this.comments = value?.commentResponseList;
        this.commentForm.setValue({
          content: null,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
