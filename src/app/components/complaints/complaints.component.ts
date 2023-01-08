import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComplaintService } from 'src/app/services/complaint/complaint.service';
import { Complaint } from 'src/app/models/complaint/Complaint';
import { ComplaintCreatorDialog } from './creator/complaint-creator-dialog.component';
import { ComplaintDialogComponent } from './editor/complaint-dialog.component';
import { ComplaintDetailsDialog } from './details/complaint-details-dialog.component';

@Component({
  selector: 'complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit {
  constructor(
    private complaintService: ComplaintService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getComplaints(this.params, this.page, this.size);
  }

  displayedColumns = [
    'dateOfEvent',
    'placeOfEvent',
    'nameOfNotifier',
    'surnameOfNotifier',
    'peselOfNotifier',
    'complaintStatus',
    'actions',
  ];

  filters = new FormGroup({
    dateOfEvent: new FormControl(null),
    placeOfEvent: new FormControl(null),
    nameOfNotifier: new FormControl(null),
    surnameOfNotifier: new FormControl(null),
    peselOfNotifier: new FormControl(null),
    complaintStatus: new FormControl(null),
  });

  params: { [key: string]: string | null } = {};
  size = 5;
  page = 0;
  totalRecords = 0;
  declare complaints: Array<Complaint>;

  public getComplaints(params: any, page: number, size: number) {
    this.complaintService.getComplaints(params, page, size).subscribe(
      (value) => {
        console.log(params);
        this.complaints = value.data;
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
    this.size = 5;
    this.getComplaints(this.params, this.page, this.size);
  }

  public filterOnClick() {
    this.params = this.filters.value;

    for (let key in this.params) {
      if (this.params[key] == '') {
        this.params[key] = null;
      }
    }
    this.params['dateOfEvent'] = this.formatDate(this.params['dateOfEvent']);

    this.getComplaints(this.params, this.page, this.size);
  }

  public handlePaginator(event: any) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getComplaints(this.params, this.page, this.size);
  }

  public formatDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public edit(user: any) {
    console.log(user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.data = user;
    let dialogRef = this.dialog.open(ComplaintDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getComplaints(this.params, this.page, this.size);
    });
  }

  public createComplaint() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    let dialogRef = this.dialog.open(ComplaintCreatorDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getComplaints(this.params, this.page, this.size);
    });
  }

  public getComplaint(uuid: String) {
    let dialogRef = this.dialog.open(ComplaintDetailsDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: uuid,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getComplaints(this.params, this.page, this.size);
    });
  }

  public onSearchChange(): void {
    this.filterOnClick();
  }
}
