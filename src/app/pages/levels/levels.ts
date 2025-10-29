import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../components/loading/loading';
import { GameStateService } from '../../services/game-state.service';

export interface Level {
  id: string;
  name: string;
  description: string;
  difficulty: 'student' | 'junior' | 'mid' | 'expert' | 'senior' | 'master' | 'legendary';
  icon: string;
  color: string;
  requiredCoins: number;
  totalQuestions: number;
  timeLimit: number;
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  progress: number;
}

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    TranslateModule,
    LoadingComponent
  ],
  templateUrl: './levels.html',
  styleUrls: ['./levels.scss']
})
export class LevelsComponent implements OnInit, OnDestroy {
  isLoading = true;
  levels: Level[] = [];
  userCoins = 0;
  currentLang = 'en';
  private loadingTimeout: any;

  constructor(
    private router: Router,
    private gameState: GameStateService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.gameState.state$.subscribe(state => {
      this.userCoins = state.coins;
      this.initializeLevels(state.unlockedLevels);
    });

    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.initializeLevels(this.gameState.stateValue.unlockedLevels);
    });

    this.currentLang = this.translate.currentLang;
  }

  ngOnDestroy() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  private initializeLevels(unlockedLevels: string[]): void {
    const currentState = this.gameState.stateValue;

    this.levels = [
      {
        id: 'student',
        name: 'BOOT_CAMP',
        description: 'LEARN_FUNDAMENTALS',
        difficulty: 'student',
        icon: 'school',
        color: '#4CAF50',
        requiredCoins: 0,
        totalQuestions: 50,
        timeLimit: 30,
        unlocked: true,
        completed: currentState.levelProgress['student']?.completed || false,
        bestScore: currentState.levelProgress['student']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('student')
      },
      {
        id: 'junior',
        name: 'CODE_CADET',
        description: 'MASTER_ALGORITHMS',
        difficulty: 'junior',
        icon: 'engineering',
        color: '#2196F3',
        requiredCoins: 50,
        totalQuestions: 50,
        timeLimit: 25,
        unlocked: unlockedLevels.includes('junior'),
        completed: currentState.levelProgress['junior']?.completed || false,
        bestScore: currentState.levelProgress['junior']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('junior')
      },
      {
        id: 'mid',
        name: 'DEV_OPERATIVE',
        description: 'TACKLE_CHALLENGES',
        difficulty: 'mid',
        icon: 'architecture',
        color: '#FF9800',
        requiredCoins: 100,
        totalQuestions: 50,
        timeLimit: 20,
        unlocked: unlockedLevels.includes('mid'),
        completed: currentState.levelProgress['mid']?.completed || false,
        bestScore: currentState.levelProgress['mid']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('mid')
      },
      {
        id: 'expert',
        name: 'SYSTEM_HACKER',
        description: 'CONQUER_ADVANCED',
        difficulty: 'expert',
        icon: 'security',
        color: '#F44336',
        requiredCoins: 200,
        totalQuestions: 50,
        timeLimit: 15,
        unlocked: unlockedLevels.includes('expert'),
        completed: currentState.levelProgress['expert']?.completed || false,
        bestScore: currentState.levelProgress['expert']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('expert')
      },
      {
        id: 'senior',
        name: 'TECH_LEAD',
        description: 'ARCHITECT_SYSTEMS',
        difficulty: 'senior',
        icon: 'leaderboard',
        color: '#9C27B0',
        requiredCoins: 500,
        totalQuestions: 50,
        timeLimit: 12,
        unlocked: unlockedLevels.includes('senior'),
        completed: currentState.levelProgress['senior']?.completed || false,
        bestScore: currentState.levelProgress['senior']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('senior')
      },
      {
        id: 'master',
        name: 'PRINCIPAL_ENGINEER',
        description: 'SOLVE_COMPLEX_PROBLEMS',
        difficulty: 'master',
        icon: 'psychology',
        color: '#607D8B',
        requiredCoins: 1000,
        totalQuestions: 50,
        timeLimit: 10,
        unlocked: unlockedLevels.includes('master'),
        completed: currentState.levelProgress['master']?.completed || false,
        bestScore: currentState.levelProgress['master']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('master')
      },
      {
        id: 'legendary',
        name: 'TECH_VISIONARY',
        description: 'SHAPE_THE_FUTURE',
        difficulty: 'legendary',
        icon: 'auto_awesome',
        color: '#FFD700',
        requiredCoins: 2000,
        totalQuestions: 50,
        timeLimit: 8,
        unlocked: unlockedLevels.includes('legendary'),
        completed: currentState.levelProgress['legendary']?.completed || false,
        bestScore: currentState.levelProgress['legendary']?.bestScore || 0,
        progress: this.gameState.getLevelProgress('legendary')
      }
    ];
  }

  selectLevel(level: Level): void {
    if (!level.unlocked) {
      if (this.userCoins >= level.requiredCoins) {
        this.unlockLevel(level);
      }
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/quiz'], {
        queryParams: { level: level.id }
      });
    }, 1000);
  }

  unlockLevel(level: Level): void {
    if (this.userCoins >= level.requiredCoins) {
      this.gameState.spendCoins(level.requiredCoins);
      this.gameState.unlockLevel(level.id);
      level.unlocked = true;
    }
  }

  getLevelProgress(level: Level): number {
    return level.progress || 0;
  }

  getDifficultyText(difficulty: string): string {
    const difficultyMap: { [key: string]: string } = {
      'student': 'BEGINNER',
      'junior': 'INTERMEDIATE',
      'mid': 'ADVANCED',
      'expert': 'EXPERT',
      'senior': 'SENIOR',
      'master': 'MASTER',
      'legendary': 'LEGENDARY'
    };
    return difficultyMap[difficulty] || difficulty.toUpperCase();
  }

  goBack(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);

    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }
}
