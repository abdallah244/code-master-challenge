import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../components/loading/loading';
import { GameStateService } from '../../services/game-state.service';
import { QuizService } from '../../services/quiz.service';
import { Question, QuizResult } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    TranslateModule,
    LoadingComponent
  ],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  Math = Math; // للوصول إلى دوال الرياضيات في القالب
  isLoading = true;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  isAnswered = false;
  score = 0;
  coinsEarned = 0;
  timeLeft = 30;
  timer: any;

  selectedLevel: any;
  questions: Question[] = [];
  currentQuestion!: Question;

  // Tools
  skipToolAvailable = false;
  removeTwoToolAvailable = false;
  timeBoostAvailable = false;
  doubleCoinsAvailable = false;
  scoreBoostAvailable = false;
  streakProtectorAvailable = false;

  // Game state
  gameStarted = false;
  gameCompleted = false;
  correctAnswersCount = 0;
  currentStreak = 0;
  maxStreak = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameState: GameStateService,
    private quizService: QuizService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const levelId = params['level'];
      if (levelId) {
        this.initializeLevel(levelId);
      } else {
        this.router.navigate(['/levels']);
      }
    });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  initializeLevel(levelId: string) {
    const levels = {
      'student': {
        name: 'BOOT_CAMP',
        timeLimit: 30,
        color: '#4CAF50',
        icon: 'school'
      },
      'junior': {
        name: 'CODE_CADET',
        timeLimit: 25,
        color: '#2196F3',
        icon: 'engineering'
      },
      'mid': {
        name: 'DEV_OPERATIVE',
        timeLimit: 20,
        color: '#FF9800',
        icon: 'architecture'
      },
      'expert': {
        name: 'SYSTEM_HACKER',
        timeLimit: 15,
        color: '#F44336',
        icon: 'security'
      },
      'senior': {
        name: 'TECH_LEAD',
        timeLimit: 12,
        color: '#9C27B0',
        icon: 'leaderboard'
      },
      'master': {
        name: 'PRINCIPAL_ENGINEER',
        timeLimit: 10,
        color: '#607D8B',
        icon: 'psychology'
      },
      'legendary': {
        name: 'TECH_VISIONARY',
        timeLimit: 8,
        color: '#FFD700',
        icon: 'auto_awesome'
      }
    };

    this.selectedLevel = {
      id: levelId,
      ...levels[levelId as keyof typeof levels],
      difficulty: levelId
    };

    this.loadQuestions();
    this.loadTools();
  }

  loadQuestions() {
    // استخدام 50 سؤال حقيقي
    this.questions = this.quizService.getQuestions(this.selectedLevel.difficulty as any, 50);

    if (this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
      this.timeLeft = this.selectedLevel.timeLimit;

      setTimeout(() => {
        this.isLoading = false;
        this.startGame();
      }, 2000);
    } else {
      console.error('No questions loaded');
      this.router.navigate(['/levels']);
    }
  }

  loadTools() {
    this.gameState.state$.subscribe(state => {
      this.skipToolAvailable = state.tools.skip > 0;
      this.removeTwoToolAvailable = state.tools.removeTwo > 0;
      this.timeBoostAvailable = state.tools.timeBoost > 0;
      this.doubleCoinsAvailable = state.tools.doubleCoins > 0;
      this.scoreBoostAvailable = state.tools.scoreBoost > 0;
      this.streakProtectorAvailable = state.tools.streakProtector > 0;
    });
  }

  startGame() {
    this.gameStarted = true;
    this.startTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.handleTimeUp();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  selectAnswer(index: number) {
    if (this.isAnswered) return;

    this.selectedAnswer = index;
    this.isAnswered = true;
    this.clearTimer();

    if (index === this.currentQuestion.correctAnswer) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  handleCorrectAnswer() {
    this.correctAnswersCount++;
    this.currentStreak++;
    this.maxStreak = Math.max(this.maxStreak, this.currentStreak);

    let points = 10;
    let coins = 5;

    // تطبيق تعزيز النقاط
    const scoreBoost = this.gameState.stateValue
.boosts.find(b => b.type === 'scoreBoost');
    if (scoreBoost) {
      points += 5;
    }

    // مكافأة السرعة
    if (this.timeLeft > 20) {
      points += 5;
    } else if (this.timeLeft > 10) {
      points += 3;
    }

    // مكافأة التسلسل
    if (this.currentStreak >= 5) {
      points += Math.floor(this.currentStreak / 5) * 2;
    }

    this.score += points;

    // تطبيق تعزيز الكوينز
    const doubleCoins = this.gameState.stateValue
.boosts.find(b => b.type === 'doubleCoins');
    if (doubleCoins) {
      coins *= 2;
    }

    if (this.timeLeft > 15) {
      coins += 2;
    }
    if (this.currentStreak >= 3) {
      coins += Math.floor(this.currentStreak / 3);
    }

    this.coinsEarned += coins;

    // تحديث التعزيزات
    this.gameState.updateBoosts();

    this.showMessage(`إجابة صحيحة! +${points} نقطة`, 'success');
  }

  handleWrongAnswer() {
    const streakProtector =this.gameState.stateValue
.boosts.find(b => b.type === 'streakProtector');

    if (streakProtector) {
      this.showMessage('تم حماية تسلسلك من الخطأ!', 'info');
      this.gameState.updateBoosts();
    } else {
      this.currentStreak = 0;
      this.showMessage('إجابة خاطئة', 'error');
    }
  }

  handleTimeUp() {
    this.isAnswered = true;
    this.selectedAnswer = null;

    const streakProtector = this.gameState.stateValue.boosts.find(b => b.type === 'streakProtector');
    if (!streakProtector) {
      this.currentStreak = 0;
    }

    this.showMessage('انتهى الوقت!', 'warning');

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.resetQuestionState();
      this.startTimer();
    } else {
      this.completeGame();
    }
  }

  resetQuestionState() {
    this.selectedAnswer = null;
    this.isAnswered = false;
    this.timeLeft = this.selectedLevel.timeLimit;
  }

  completeGame() {
    this.gameCompleted = true;
    this.clearTimer();

    // تحديث تقدم المستوى
    this.gameState.updateLevelProgress(
      this.selectedLevel.id,
      this.score,
      this.correctAnswersCount
    );

    // إضافة الكوينز المكتسبة
    if (this.coinsEarned > 0) {
      this.gameState.addCoins(this.coinsEarned);
    }

    // فتح المستوى التالي إذا حقق نتيجة جيدة
    if (this.score >= 300) { // 60% من 500 نقطة
      this.unlockNextLevel();
    }

    this.showMessage(`تهانينا! أكملت ${this.correctAnswersCount} من ${this.questions.length} سؤال`, 'success');
  }

  unlockNextLevel() {
    const levels = ['student', 'junior', 'mid', 'expert', 'senior', 'master', 'legendary'];
    const currentIndex = levels.indexOf(this.selectedLevel.id);

    if (currentIndex < levels.length - 1) {
      const nextLevel = levels[currentIndex + 1];
      this.gameState.unlockLevel(nextLevel);
      this.showMessage(`تم فتح المستوى ${nextLevel.toUpperCase()}!`, 'success');
    }
  }

  useSkipTool() {
    if (this.skipToolAvailable && this.gameState.useTool('skip')) {
      this.clearTimer();
      this.showMessage('تم تخطي السؤال', 'info');
      this.nextQuestion();
      return true;
    }
    this.showMessage('لا تملك أدوات تخطي', 'warning');
    return false;
  }

  useRemoveTwoTool() {
    if (this.removeTwoToolAvailable && !this.isAnswered && this.gameState.useTool('removeTwo')) {
      this.removeTwoWrongAnswers();
      return true;
    }
    this.showMessage('لا تملك أدوات حذف الإجابات', 'warning');
    return false;
  }

  useTimeBoost() {
    if (this.timeBoostAvailable && this.gameState.useTool('timeBoost')) {
      this.timeLeft += 10;
      this.showMessage('+10 ثواني إضافية', 'success');
      return true;
    }
    this.showMessage('لا تملك تعزيزات الوقت', 'warning');
    return false;
  }

  useDoubleCoins() {
    if (this.doubleCoinsAvailable && this.gameState.useTool('doubleCoins')) {
      this.gameState.addBoost({ type: 'doubleCoins', remainingQuestions: 5 });
      this.showMessage('مضاعفة الكوينز لمدة 5 أسئلة', 'success');
      return true;
    }
    this.showMessage('لا تملك تعزيزات مضاعفة الكوينز', 'warning');
    return false;
  }

  useScoreBoost() {
    if (this.scoreBoostAvailable && this.gameState.useTool('scoreBoost')) {
      this.gameState.addBoost({ type: 'scoreBoost', remainingQuestions: 3 });
      this.showMessage('تعزيز النقاط لمدة 3 أسئلة', 'success');
      return true;
    }
    this.showMessage('لا تملك تعزيزات النقاط', 'warning');
    return false;
  }

  useStreakProtector() {
    if (this.streakProtectorAvailable && this.gameState.useTool('streakProtector')) {
      this.gameState.addBoost({ type: 'streakProtector', remainingQuestions: 1 });
      this.showMessage('حماية التسلسل للسؤال القادم', 'success');
      return true;
    }
    this.showMessage('لا تملك حامي التسلسل', 'warning');
    return false;
  }

  private removeTwoWrongAnswers() {
    if (!this.currentQuestion || this.isAnswered) return;

    const wrongAnswers = this.currentQuestion.options
      .map((_, index) => index)
      .filter(index => index !== this.currentQuestion.correctAnswer);

    if (wrongAnswers.length >= 2) {
      const removedIndices = this.shuffleArray(wrongAnswers).slice(0, 2);
      this.showMessage(`تم حذف إجابتين خاطئتين`, 'info');

      // في التطبيق الحقيقي، هنا سنقوم بإخفاء أو تعطيل هذه الإجابات
      console.log('Removing answers at indices:', removedIndices);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  getProgressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  getTimeColor(): string {
    if (this.timeLeft > 15) return 'primary';
    if (this.timeLeft > 5) return 'accent';
    return 'warn';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
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

  showMessage(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [`snack-${type}`]
    });
  }

  goToResults() {
    this.isLoading = true;
    setTimeout(() => {
      const result: QuizResult = {
        score: this.score,
        totalQuestions: this.questions.length,
        correctAnswers: this.correctAnswersCount,
        timeSpent: (this.questions.length * this.selectedLevel.timeLimit) - this.timeLeft,
        coinsEarned: this.coinsEarned,
        level: this.selectedLevel.difficulty,
        streak: this.maxStreak
      };

      this.router.navigate(['/results'], { queryParams: { result: JSON.stringify(result) } });
    }, 1000);
  }

  exitGame() {
    this.isLoading = true;
    this.clearTimer();
    setTimeout(() => {
      this.router.navigate(['/levels']);
    }, 500);
  }
}
