import { Component, OnInit } from '@angular/core';
import { MockTest } from 'src/app/models/mock/MockTest';
import { MockService } from 'src/app/services/mock/mock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
})
export class Dashboard1Component implements OnInit{
  constructor(
    private mockService: MockService,
) {}
  ngOnInit(): void {
    this.getStats();
  }

  declare mock: MockTest;

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
}
