import { Component, Input } from '@angular/core';
import { MockTest } from 'src/app/models/mock/MockTest';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.scss'],
})
export class TopCardComponent {
  @Input() mock: MockTest | undefined;
  constructor() {
    console.log(this.mock)
  }
}
