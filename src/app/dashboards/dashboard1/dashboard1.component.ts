import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MockTest } from 'src/app/models/mock/MockTest';
import { MockService } from 'src/app/services/mock/mock.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
})
export class Dashboard1Component implements OnInit{
  constructor(
    private mockService: MockService,
    private scheduleService: ScheduleService,
    private sanitizer: DomSanitizer,
) {}
  ngOnInit(): void {
    this.getStats();
    this.openFile();
  }

  declare mock: MockTest;
  declare image: any;

  public getStats() {
    this.mockService.getStats().subscribe(
        (value) => {
            this.mock = value;
        },
        (error) => {
            console.log(error);
        },
    );
}

public openFile() {
  this.scheduleService.getFileByPath().subscribe(
    (value: any) => {
        var file = new Blob([value], { type: 'image/jpeg' });
        var fileURL = URL.createObjectURL(file);
        this.image = this.sanitizer.bypassSecurityTrustUrl(fileURL);
    },
    (error) => {
      console.log(error);
      var errorMessage = error.error.details;
    }
  );
}
}
