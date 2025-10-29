import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../components/loading/loading';
import { GameStateService } from '../../services/game-state.service';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  price: number;
  category: 'tool' | 'boost' | 'cosmetic' | 'unlock';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
  quantity?: number;
  maxQuantity?: number;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    TranslateModule,
    LoadingComponent
  ],
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  isLoading = true;
  userCoins = 0;
  shopItems: ShopItem[] = [];
  filteredItems: ShopItem[] = [];
  activeCategory: string = 'all';
  currentLang = 'en';

  private loadingTimeout: any;

  constructor(
    private router: Router,
    private gameState: GameStateService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.gameState.state$.subscribe(state => {
      this.userCoins = state.coins;
      this.initializeShopItems(state.tools);
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

  private initializeShopItems(userTools: any): void {
    this.shopItems = [
      // الأدوات الأساسية
      {
        id: 'skip_tool',
        name: 'TIME_SKIPPER',
        description: 'Skip one question, up to 10 times per single game',
        icon: 'fast_forward',
        color: '#2196F3',
        price: 50,
        category: 'tool',
        rarity: 'common',
        effect: 'Skip current question',
        quantity: userTools.skip || 0,
        maxQuantity: 10
      },
      {
        id: 'remove_two_tool',
        name: 'ANSWER_FILTER',
        description: 'Remove two wrong options, max 5 uses per game',
        icon: 'filter_alt',
        color: '#4CAF50',
        price: 75,
        category: 'tool',
        rarity: 'rare',
        effect: 'Remove two wrong answers',
        quantity: userTools.removeTwo || 0,
        maxQuantity: 5
      },
      {
        id: 'time_boost',
        name: 'TIME_EXTENDER',
        description: 'Gain extra time, usable once per question only',
        icon: 'timer',
        color: '#FF9800',
        price: 100,
        category: 'tool',
        rarity: 'rare',
        effect: '+10 seconds on current question',
        quantity: 0,
        maxQuantity: 3
      },

      // التعزيزات
      {
        id: 'double_coins',
        name: 'COIN_DOUBLER',
        description: 'Double coins for next 5 questions in game.',
        icon: 'paid',
        color: '#FFD700',
        price: 200,
        category: 'boost',
        rarity: 'epic',
        effect: 'Double coins earned for 5 questions'
      },
      {
        id: 'score_boost',
        name: 'SCORE_AMPLIFIER',
        description: 'Boosts your score by 50% for the next 5 questions.',
        icon: 'trending_up',
        color: '#E91E63',
        price: 150,
        category: 'boost',
        rarity: 'epic',
        effect: '+5 points per correct answer for 3 questions'
      },
      {
        id: 'streak_protector',
        name: 'STREAK_GUARDIAN',
        description: 'Protects your streak if you answer one question wrong.',
        icon: 'shield',
        color: '#9C27B0',
        price: 300,
        category: 'boost',
        rarity: 'legendary',
        effect: 'Protect your streak from one wrong answer'
      },

      // فتح المستويات
      {
        id: 'unlock_junior',
        name: 'JUNIOR_ACCESS',
        description: 'Unlocks beginner-level questions and basic rewards.',
        icon: 'lock_open',
        color: '#2196F3',
        price: 50,
        category: 'unlock',
        rarity: 'common',
        effect: 'Unlock Junior level'
      },
      {
        id: 'unlock_mid',
        name: 'MID_ACCESS',
        description: 'Unlocks intermediate-level questions and new rewards.',
        icon: 'lock_open',
        color: '#FF9800',
        price: 100,
        category: 'unlock',
        rarity: 'rare',
        effect: 'Unlock Mid level'
      },
      {
        id: 'unlock_expert',
        name: 'EXPERT_ACCESS',
        description: 'Unlocks expert-level questions and exclusive rewards.',
        icon: 'lock_open',
        color: '#F44336',
        price: 200,
        category: 'unlock',
        rarity: 'epic',
        effect: 'Unlock Expert level'
      },
      {
        id: 'unlock_senior',
        name: 'SENIOR_ACCESS',
        description: 'Unlocks senior-level questions and premium rewards.',
        icon: 'lock_open',
        color: '#9C27B0',
        price: 500,
        category: 'unlock',
        rarity: 'legendary',
        effect: 'Unlock Senior level'
      },

      // المظهر
      {
        id: 'dark_theme',
        name: 'NIGHT_VISION',
        description: 'Enables dark mode for a better and smoother visual experience.',
        icon: 'dark_mode',
        color: '#673AB7',
        price: 250,
        category: 'cosmetic',
        rarity: 'epic',
        effect: 'Dark theme for better focus'
      },
      {
        id: 'matrix_theme',
        name: 'MATRIX_VISION',
        description: 'Activates a digital Matrix-style green code interface.',
        icon: 'code',
        color: '#00E676',
        price: 500,
        category: 'cosmetic',
        rarity: 'legendary',
        effect: 'Green matrix-style theme'
      },
      {
        id: 'golden_border',
        name: 'GOLDEN_FRAME',
        description: 'Adds a shiny golden border around your profile or items.',
        icon: 'border_outer',
        color: '#FFD700',
        price: 150,
        category: 'cosmetic',
        rarity: 'rare',
        effect: 'Golden border around questions'
      }
    ];

    this.filteredItems = this.shopItems;
  }

  filterItems(category: string): void {
    this.activeCategory = category;

    if (category === 'all') {
      this.filteredItems = this.shopItems;
    } else {
      this.filteredItems = this.shopItems.filter(item => item.category === category);
    }
  }

  buyItem(item: ShopItem): void {
    if (this.userCoins < item.price) {
      this.showMessage('INSUFFICIENT_FUNDS', 'error');
      return;
    }

    if (item.quantity !== undefined && item.maxQuantity !== undefined && item.quantity >= item.maxQuantity) {
      this.showMessage('MAX_QUANTITY_REACHED', 'warning');
      return;
    }

    // معالجة الشراء بناءً على نوع العنصر
    let success = false;

    switch (item.category) {
      case 'tool':
        success = this.buyTool(item);
        break;
      case 'boost':
        success = this.buyBoost(item);
        break;
      case 'unlock':
        success = this.buyUnlock(item);
        break;
      case 'cosmetic':
        success = this.buyCosmetic(item);
        break;
    }

    if (success) {
      this.gameState.spendCoins(item.price);
      this.showMessage('PURCHASE_SUCCESSFUL', 'success');
    }
  }

  private buyTool(item: ShopItem): boolean {
    switch (item.id) {
      case 'skip_tool':
        this.gameState.addTool('skip', 1);
        break;
      case 'remove_two_tool':
        this.gameState.addTool('removeTwo', 1);
        break;
      case 'time_boost':
        // إضافة تعزيز الوقت
        break;
    }
    return true;
  }

  private buyBoost(item: ShopItem): boolean {
    // معالجة شراء التعزيزات
    return true;
  }

  private buyUnlock(item: ShopItem): boolean {
    const levelMap: { [key: string]: string } = {
      'unlock_junior': 'junior',
      'unlock_mid': 'mid',
      'unlock_expert': 'expert',
      'unlock_senior': 'senior'
    };

    const levelId = levelMap[item.id];
    if (levelId) {
      this.gameState.unlockLevel(levelId);
      return true;
    }
    return false;
  }

  private buyCosmetic(item: ShopItem): boolean {
    // معالجة شراء المظهر
    return true;
  }

getCategoryCount(category: string): number {
  if (category === 'all') {
    return this.shopItems.length;
  }
  return this.shopItems.filter(item => item.category === category).length;
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
      'all': 'ALL_ITEMS',
      'tool': 'TOOLS',
      'boost': 'BOOSTS',
      'unlock': 'UNLOCKS',
      'cosmetic': 'COSMETICS'
    };
    return names[category] || category;
  }

  canAfford(item: ShopItem): boolean {
    return this.userCoins >= item.price;
  }

  isMaxQuantity(item: ShopItem): boolean {
    return item.quantity !== undefined &&
           item.maxQuantity !== undefined &&
           item.quantity >= item.maxQuantity;
  }

  showMessage(messageKey: string, type: 'success' | 'error' | 'warning'): void {
    this.translate.get(messageKey).subscribe(message => {
      this.snackBar.open(message, 'OK', {
        duration: 3000,
        panelClass: [`snack-${type}`]
      });
    });
  }

  goBack(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
}
