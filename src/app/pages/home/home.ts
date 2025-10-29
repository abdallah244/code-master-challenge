import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LoadingComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  coins = 0;
  currentLang = 'en';
  private loadingTimeout: any;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private gameState: GameStateService
  ) {}

  ngOnInit() {
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 2500);

    // الحصول على عدد الكوينز
    this.gameState.state$.subscribe(state => {
      this.coins = state.coins;
    });

    // الحصول على اللغة الحالية
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });

    this.currentLang = this.translate.currentLang;
  }

  ngOnDestroy() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);

    // تغيير اتجاه الصفحة للعربية
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }

  navigateTo(route: string): void {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 800);
  }
}
