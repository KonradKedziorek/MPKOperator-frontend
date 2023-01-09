import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentReply } from 'src/app/models/comment/CommentReply';
import { CommentRequest } from 'src/app/models/comment/CommentRequest';
import { CommentResponse } from 'src/app/models/comment/CommentResponse';
import { ComplaintDetailsResponse } from 'src/app/models/complaint/ComplaintDetailsResponse';
import { ComplaintHistoryResponse } from 'src/app/models/ComplaintHistoryResponse';
import { MethodArgumentNotValidFieldMessage } from 'src/app/models/errors/MethodArgumentNotValidFieldMessage';

import { ComplaintService } from 'src/app/services/complaint/complaint.service';
@Component({
  selector: 'complaint-details-dialog-component',
  templateUrl: './complaint-details-dialog.component.html',
  styleUrls: ['./complaint-details-dialog.component.scss'],
})
export class ComplaintDetailsDialog implements OnInit {
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private complaintService: ComplaintService,
    @Inject(MAT_DIALOG_DATA) data: String,
  ) {
    if (data !== null) {
      this.uuid = data;
      this.getDetails(data);
      this.getComplaintHistoryList(data);
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
  declare complaintHistories: Array<ComplaintHistoryResponse>;

  public getDetails(uuid: String) {
    this.complaintService.getComplaint(uuid).subscribe(
      (value) => {
        this.complaint = value;
        this.comments = value.comments;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.complaintStatus;
        });
      },
      (error) => {},
    );
  }

  public getComplaintHistoryList(uuid: String) {
    this.complaintService.getComplaintHistoryList(uuid).subscribe(
      (value) => {
        this.complaintHistories = value;
      },
      (error) => {},
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

  public async changeStatus(uuid: String, status: String) {
    this.complaintService.changeStatus(uuid, status).subscribe(
      (value) => {
        this.complaint = value;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.complaintStatus;
        });
        this.getComplaintHistoryList(uuid);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public statuses: any[] = [
    {
      status: 'RECEIVED',
    },
    {
      status: 'PROCESSED',
    },
    {
      status: 'REJECTED',
    },
    {
      status: 'ACCEPTED',
    },
    {
      status: 'IN_PROGRESS',
    },
    {
      status: 'FINISHED',
    },
  ];
}
