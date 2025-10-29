import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GameState {
  coins: number;
  unlockedLevels: string[];
  tools: {
    skip: number;
    removeTwo: number;
    timeBoost: number;
    doubleCoins: number;
    scoreBoost: number;
    streakProtector: number;
  };
  boosts: {
    active: boolean;
    type: string;
    remainingQuestions: number;
  }[];
  achievements: string[];
  currentLevel: string | null;
  currentScore: number;
  levelProgress: {
    [key: string]: {
      completed: boolean;
      bestScore: number;
      questionsAnswered: number;
      totalQuestions: number;
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private initialState: GameState = {
    coins: 100,
    unlockedLevels: ['student'],
    tools: {
      skip: 2,
      removeTwo: 1,
      timeBoost: 0,
      doubleCoins: 0,
      scoreBoost: 0,
      streakProtector: 0
    },
    boosts: [],
    achievements: [],
    currentLevel: null,
    currentScore: 0,
    levelProgress: {
      student: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      junior: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      mid: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      expert: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      senior: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      master: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 },
      legendary: { completed: false, bestScore: 0, questionsAnswered: 0, totalQuestions: 50 }
    }
  };

  private stateSubject = new BehaviorSubject<GameState>(this.loadState());
  public state$ = this.stateSubject.asObservable();

get stateValue(): GameState {
  return this.stateSubject.value;
}



  constructor() {
    // التأكد من تهيئة الحالة بشكل صحيح
    this.initializeState();
  }

  private initializeState(): void {
    const savedState = this.loadState();
    if (!savedState.levelProgress) {
      savedState.levelProgress = this.initialState.levelProgress;
    }
    this.stateSubject.next(savedState);
  }

  private loadState(): GameState {
    try {
      const saved = localStorage.getItem('codeMasterState');
      if (saved) {
        const parsed = JSON.parse(saved);
        // التأكد من وجود جميع الخصائص المطلوبة
        return {
          ...this.initialState,
          ...parsed,
          tools: {
            ...this.initialState.tools,
            ...(parsed.tools || {})
          },
          levelProgress: {
            ...this.initialState.levelProgress,
            ...(parsed.levelProgress || {})
          }
        };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return this.initialState;
  }

  private saveState(state: GameState): void {
    try {
      localStorage.setItem('codeMasterState', JSON.stringify(state));
      this.stateSubject.next(state);
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  addCoins(amount: number): void {
    const current = this.stateSubject.value;
    this.saveState({
      ...current,
      coins: current.coins + amount
    });
  }

  spendCoins(amount: number): boolean {
    const current = this.stateSubject.value;
    if (current.coins >= amount) {
      this.saveState({
        ...current,
        coins: current.coins - amount
      });
      return true;
    }
    return false;
  }

  unlockLevel(level: string): void {
    const current = this.stateSubject.value;
    if (!current.unlockedLevels.includes(level)) {
      this.saveState({
        ...current,
        unlockedLevels: [...current.unlockedLevels, level]
      });
    }
  }

  addTool(tool: 'skip' | 'removeTwo' | 'timeBoost' | 'doubleCoins' | 'scoreBoost' | 'streakProtector', quantity: number = 1): void {
    const current = this.stateSubject.value;
    this.saveState({
      ...current,
      tools: {
        ...current.tools,
        [tool]: (current.tools[tool] || 0) + quantity
      }
    });
  }

  useTool(tool: 'skip' | 'removeTwo' | 'timeBoost' | 'doubleCoins' | 'scoreBoost' | 'streakProtector'): boolean {
    const current = this.stateSubject.value;
    if (current.tools[tool] > 0) {
      this.saveState({
        ...current,
        tools: {
          ...current.tools,
          [tool]: current.tools[tool] - 1
        }
      });
      return true;
    }
    return false;
  }

  updateLevelProgress(level: string, score: number, questionsAnswered: number): void {
    const current = this.stateSubject.value;
    const currentProgress = current.levelProgress[level] || {
      completed: false,
      bestScore: 0,
      questionsAnswered: 0,
      totalQuestions: 50
    };

    const totalQuestions = currentProgress.totalQuestions || 50;

    this.saveState({
      ...current,
      levelProgress: {
        ...current.levelProgress,
        [level]: {
          completed: questionsAnswered >= totalQuestions,
          bestScore: Math.max(currentProgress.bestScore, score),
          questionsAnswered: Math.min(Math.max(currentProgress.questionsAnswered, questionsAnswered), totalQuestions),
          totalQuestions: totalQuestions
        }
      }
    });
  }

  getLevelProgress(level: string): number {
    const current = this.stateSubject.value;
    const progress = current.levelProgress[level];
    if (progress && progress.totalQuestions > 0) {
      return (progress.questionsAnswered / progress.totalQuestions) * 100;
    }
    return 0;
  }

  addBoost(boost: { type: string; remainingQuestions: number }): void {
    const current = this.stateSubject.value;
    this.saveState({
      ...current,
      boosts: [...current.boosts, { ...boost, active: true }]
    });
  }

  updateBoosts(): void {
    const current = this.stateSubject.value;
    const updatedBoosts = current.boosts
      .map(boost => ({
        ...boost,
        remainingQuestions: boost.remainingQuestions - 1
      }))
      .filter(boost => boost.remainingQuestions > 0);

    this.saveState({
      ...current,
      boosts: updatedBoosts
    });
  }

  resetGame(): void {
    this.saveState(this.initialState);
  }

  // دالة مساعدة لتصحيح الحالة
  fixGameState(): void {
    const current = this.stateSubject.value;
    const fixedState: GameState = {
      ...this.initialState,
      ...current,
      tools: {
        ...this.initialState.tools,
        ...(current.tools || {})
      },
      levelProgress: {
        ...this.initialState.levelProgress,
        ...(current.levelProgress || {})
      },
      unlockedLevels: current.unlockedLevels || ['student']
    };

    this.saveState(fixedState);
  }
}
