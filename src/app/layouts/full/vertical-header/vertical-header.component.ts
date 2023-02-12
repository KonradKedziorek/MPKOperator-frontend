import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vertical-header',
  templateUrl: './vertical-header.component.html',
  styleUrls: [],
})
export class VerticalAppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Polski',
      code: 'pl',
      icon: 'pl',
    },
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }
}
