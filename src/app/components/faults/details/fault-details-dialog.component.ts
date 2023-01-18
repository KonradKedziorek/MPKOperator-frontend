import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommentRequest } from "src/app/models/comment/CommentRequest";
import { CommentResponse } from "src/app/models/comment/CommentResponse";
import { FaultDetailsResponse } from "src/app/models/fault/FaultDetailsResponse";
import { FaultHistoryResponse } from "src/app/models/FaultHistoryResponse";
import { FaultService } from "src/app/services/fault/fault.service";

@Component({
  selector: 'fault-details-dialog-component',
  templateUrl: './fault-details-dialog.component.html',
  styleUrls: ['./fault-details-dialog.component.scss'],
})
export class FaultDetailsDialog implements OnInit {
    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private faultService: FaultService,
        @Inject(MAT_DIALOG_DATA) data: String,
    ) {
        if (data !== null) {
          this.uuid = data;
          this.getDetails(data);
          this.getFaultHistoryList(data);
        }
    }

    ngOnInit(): void {
        this.commentForm = new FormGroup({
            content: new FormControl(null),
        });
    }

  declare commentForm: any;
  declare uuid: String;

  declare fault: FaultDetailsResponse;
  declare comments?: Array<CommentResponse>;
  declare faultHistories: Array<FaultHistoryResponse>;

  public getDetails(uuid: String) {
    this.faultService.getFault(uuid).subscribe(
      (value) => {
        this.fault = value;
        this.comments = value.comments;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.faultStatus;
        });
      },
      (error) => {},
    );
  }

  public getFaultHistoryList(uuid: String) {
    this.faultService.getFaultHistoryList(uuid).subscribe(
      (value) => {
        this.faultHistories = value;
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
    await this.faultService
      .addComment(commentRequest, this.fault.uuid)
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
    this.faultService.changeStatus(uuid, status).subscribe(
      (value) => {
        this.fault = value;
        this.statuses = this.statuses.filter(function (el) {
          return el.status != value.faultStatus;
        });
        this.getFaultHistoryList(uuid);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public statuses: any[] = [
        {
          status: 'REPORTED',
        },
        {
          status: 'CHECKING',
        },
        {
          status: 'WAITING_FOR_CAR_PARTS',
        },
        {
          status: 'FIXING_IN_PROGRESS',
        },
        {
          status: 'SUSPENDED',
        },
        {
          status: 'FINISHED',
        },
    ];
}