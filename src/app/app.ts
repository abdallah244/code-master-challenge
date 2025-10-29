import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // تعيين اللغة الافتراضية
    this.translate.setDefaultLang('en');

    // محاولة استخدام اللغة المحفوظة أو لغة المتصفح
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = this.translate.getBrowserLang();

    const langToUse = savedLang || (browserLang && ['ar', 'en'].includes(browserLang) ? browserLang : 'en');

    // استخدام اللغة مع الانتظار حتى تكون جاهزة
    setTimeout(() => {
      this.translate.use(langToUse).subscribe(() => {
        this.setDocumentDirection(langToUse);
      });
    }, 0);

    // الاستماع لتغييرات اللغة
    this.translate.onLangChange.subscribe(event => {
      this.setDocumentDirection(event.lang);
      localStorage.setItem('preferredLanguage', event.lang);
    });
  }

  private setDocumentDirection(lang: string): void {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }
}
