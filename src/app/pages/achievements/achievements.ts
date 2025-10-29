import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../components/loading/loading';
import { GameStateService } from '../../services/game-state.service';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'level' | 'score' | 'streak' | 'tools' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: number;
  currentProgress: number;
  completed: boolean;
  reward: number;
  unlockedAt?: Date;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule,
    TranslateModule,
    LoadingComponent
  ],
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.scss']
})
export class AchievementsComponent implements OnInit, OnDestroy {
  isLoading = true;
  achievements: Achievement[] = [];
  filteredAchievements: Achievement[] = [];
  activeCategory: string = 'all';
  totalAchievements = 0;
  unlockedAchievements = 0;
  userCoins = 0;
  currentLang = 'en';


  private loadingTimeout: any;

  constructor(
    private router: Router,
    private gameState: GameStateService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.gameState.state$.subscribe(state => {
      this.userCoins = state.coins;
      this.initializeAchievements(state);
    });

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

  private initializeAchievements(state: any): void {
    this.achievements = [
      // إنجازات المستويات
      {
        id: 'first_steps',
        name: 'FIRST_STEPS',
        description: 'FIRST_STEPS_DESC',
        icon: 'school',
        color: '#4CAF50',
        category: 'level',
        rarity: 'common',
        requirement: 1,
        currentProgress: state.levelProgress['student']?.questionsAnswered || 0,
        completed: (state.levelProgress['student']?.questionsAnswered || 0) >= 1,
        reward: 10
      },
      {
        id: 'code_apprentice',
        name: 'CODE_APPRENTICE',
        description: 'CODE_APPRENTICE_DESC',
        icon: 'engineering',
        color: '#2196F3',
        category: 'level',
        rarity: 'common',
        requirement: 25,
        currentProgress: state.levelProgress['student']?.questionsAnswered || 0,
        completed: (state.levelProgress['student']?.questionsAnswered || 0) >= 25,
        reward: 25
      },
      {
        id: 'master_coder',
        name: 'MASTER_CODER',
        description: 'MASTER_CODER_DESC',
        icon: 'architecture',
        color: '#FF9800',
        category: 'level',
        rarity: 'rare',
        requirement: 50,
        currentProgress: state.levelProgress['student']?.questionsAnswered || 0,
        completed: (state.levelProgress['student']?.questionsAnswered || 0) >= 50,
        reward: 50
      },
      {
        id: 'junior_expert',
        name: 'JUNIOR_EXPERT',
        description: 'JUNIOR_EXPERT_DESC',
        icon: 'security',
        color: '#F44336',
        category: 'level',
        rarity: 'rare',
        requirement: 25,
        currentProgress: state.levelProgress['junior']?.questionsAnswered || 0,
        completed: (state.levelProgress['junior']?.questionsAnswered || 0) >= 25,
        reward: 75
      },
      {
        id: 'system_architect',
        name: 'SYSTEM_ARCHITECT',
        description: 'SYSTEM_ARCHITECT_DESC',
        icon: 'leaderboard',
        color: '#9C27B0',
        category: 'level',
        rarity: 'epic',
        requirement: 50,
        currentProgress: state.levelProgress['expert']?.questionsAnswered || 0,
        completed: (state.levelProgress['expert']?.questionsAnswered || 0) >= 50,
        reward: 100
      },

      // إنجازات النقاط
      {
        id: 'score_beginner',
        name: 'SCORE_BEGINNER',
        description: 'SCORE_BEGINNER_DESC',
        icon: 'score',
        color: '#4CAF50',
        category: 'score',
        rarity: 'common',
        requirement: 100,
        currentProgress: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ),
        completed: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ) >= 100,
        reward: 20
      },
      {
        id: 'score_master',
        name: 'SCORE_MASTER',
        description: 'SCORE_MASTER_DESC',
        icon: 'trending_up',
        color: '#2196F3',
        category: 'score',
        rarity: 'rare',
        requirement: 300,
        currentProgress: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ),
        completed: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ) >= 300,
        reward: 50
      },
      {
        id: 'perfect_score',
        name: 'PERFECT_SCORE',
        description: 'PERFECT_SCORE_DESC',
        icon: 'stars',
        color: '#FFD700',
        category: 'score',
        rarity: 'legendary',
        requirement: 500,
        currentProgress: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ),
        completed: Math.max(
          state.levelProgress['student']?.bestScore || 0,
          state.levelProgress['junior']?.bestScore || 0,
          state.levelProgress['mid']?.bestScore || 0,
          state.levelProgress['expert']?.bestScore || 0
        ) >= 500,
        reward: 100
      },

      // إنجازات التسلسل
      {
        id: 'streak_starter',
        name: 'STREAK_STARTER',
        description: 'STREAK_STARTER_DESC',
        icon: 'flash_on',
        color: '#4CAF50',
        category: 'streak',
        rarity: 'common',
        requirement: 5,
        currentProgress: 0, // سيتم تحديثه من الـ state
        completed: false,
        reward: 15
      },
      {
        id: 'hot_streak',
        name: 'HOT_STREAK',
        description: 'HOT_STREAK_DESC',
        icon: 'local_fire_department',
        color: '#FF9800',
        category: 'streak',
        rarity: 'rare',
        requirement: 10,
        currentProgress: 0,
        completed: false,
        reward: 30
      },
      {
        id: 'unstoppable',
        name: 'UNSTOPPABLE',
        description: 'UNSTOPPABLE_DESC',
        icon: 'offline_bolt',
        color: '#F44336',
        category: 'streak',
        rarity: 'epic',
        requirement: 20,
        currentProgress: 0,
        completed: false,
        reward: 60
      },

      // إنجازات الأدوات
      {
        id: 'tool_master',
        name: 'TOOL_MASTER',
        description: 'TOOL_MASTER_DESC',
        icon: 'build',
        color: '#2196F3',
        category: 'tools',
        rarity: 'rare',
        requirement: 10,
        currentProgress: Object.values(state.tools || {}).reduce((sum: number, tool: any) => sum + tool, 0),
        completed: Object.values(state.tools || {}).reduce((sum: number, tool: any) => sum + tool, 0) >= 10,
        reward: 40
      },
      {
        id: 'power_user',
        name: 'POWER_USER',
        description: 'POWER_USER_DESC',
        icon: 'electric_bolt',
        color: '#9C27B0',
        category: 'tools',
        rarity: 'epic',
        requirement: 25,
        currentProgress: Object.values(state.tools || {}).reduce((sum: number, tool: any) => sum + tool, 0),
        completed: Object.values(state.tools || {}).reduce((sum: number, tool: any) => sum + tool, 0) >= 25,
        reward: 75
      },
      {
        id: 'skip_pro',
        name: 'SKIP_PRO',
        description: 'SKIP_PRO_DESC',
        icon: 'fast_forward',
        color: '#FF9800',
        category: 'tools',
        rarity: 'common',
        requirement: 5,
        currentProgress: state.tools?.skip || 0,
        completed: (state.tools?.skip || 0) >= 5,
        reward: 20
      },
      {
        id: 'answer_expert',
        name: 'ANSWER_EXPERT',
        description: 'ANSWER_EXPERT_DESC',
        icon: 'filter_alt',
        color: '#4CAF50',
        category: 'tools',
        rarity: 'common',
        requirement: 5,
        currentProgress: state.tools?.removeTwo || 0,
        completed: (state.tools?.removeTwo || 0) >= 5,
        reward: 20
      },

      // إنجازات خاصة
      {
        id: 'early_bird',
        name: 'EARLY_BIRD',
        description: 'EARLY_BIRD_DESC',
        icon: 'schedule',
        color: '#FFD700',
        category: 'special',
        rarity: 'rare',
        requirement: 1,
        currentProgress: state.unlockedLevels?.includes('junior') ? 1 : 0,
        completed: state.unlockedLevels?.includes('junior'),
        reward: 50
      },
      {
        id: 'coin_collector',
        name: 'COIN_COLLECTOR',
        description: 'COIN_COLLECTOR_DESC',
        icon: 'savings',
        color: '#FFD700',
        category: 'special',
        rarity: 'epic',
        requirement: 500,
        currentProgress: state.coins || 0,
        completed: (state.coins || 0) >= 500,
        reward: 100
      },
      {
        id: 'completionist',
        name: 'COMPLETIONIST',
        description: 'COMPLETIONIST_DESC',
        icon: 'emoji_events',
        color: '#9C27B0',
        category: 'special',
        rarity: 'legendary',
        requirement: 7,
        currentProgress: state.unlockedLevels?.length || 1,
        completed: (state.unlockedLevels?.length || 1) >= 7,
        reward: 200
      },
      {
        id: 'speed_demon',
        name: 'SPEED_DEMON',
        description: 'SPEED_DEMON_DESC',
        icon: 'speed',
        color: '#F44336',
        category: 'special',
        rarity: 'epic',
        requirement: 1,
        currentProgress: 0, // سيتم تحديثه
        completed: false,
        reward: 75
      }
    ];

    this.updateAchievementsProgress();
    this.filteredAchievements = this.achievements;
    this.calculateStats();
  }

  private updateAchievementsProgress(): void {
    // تحديث تقدم الإنجازات بناءً على حالة اللعبة الحالية
    this.achievements.forEach(achievement => {
      if (!achievement.completed && achievement.currentProgress >= achievement.requirement) {
        achievement.completed = true;
        achievement.unlockedAt = new Date();
        this.claimReward(achievement);
      }
    });
  }

  private claimReward(achievement: Achievement): void {
    if (achievement.completed && !achievement.unlockedAt) {
      this.gameState.addCoins(achievement.reward);
    }
  }

  private calculateStats(): void {
    this.totalAchievements = this.achievements.length;
    this.unlockedAchievements = this.achievements.filter(a => a.completed).length;
  }

  filterAchievements(category: string): void {
    this.activeCategory = category;

    if (category === 'all') {
      this.filteredAchievements = this.achievements;
    } else {
      this.filteredAchievements = this.achievements.filter(achievement => achievement.category === category);
    }
  }

  getCategoryCount(category: string): number {
  if (category === 'all') {
    return this.achievements.length;
  }
  return this.achievements.filter(a => a.category === category).length;
}

  getRarityColor(rarity: string): string {
    const colors: { [key: string]: string } = {
      'common': '#757575',
      'rare': '#2196F3',
      'epic': '#9C27B0',
      'legendary': '#FF9800'
    };
    return colors[rarity] || colors['common'];

  }

  getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      'all': 'ALL_ACHIEVEMENTS',
      'level': 'LEVEL_ACHIEVEMENTS',
      'score': 'SCORE_ACHIEVEMENTS',
      'streak': 'STREAK_ACHIEVEMENTS',
      'tools': 'TOOL_ACHIEVEMENTS',
      'special': 'SPECIAL_ACHIEVEMENTS'
    };
    return names[category] || category;
  }

  getProgressPercentage(achievement: Achievement): number {
    return Math.min((achievement.currentProgress / achievement.requirement) * 100, 100);
  }

  goBack(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  getCompletionPercentage(): number {
    return this.totalAchievements > 0 ? (this.unlockedAchievements / this.totalAchievements) * 100 : 0;
  }
}
