import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'levels',
    loadComponent: () => import('./pages/levels/levels').then(m => m.LevelsComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop').then(m => m.ShopComponent)
  },
  {
    path: 'achievements',
    loadComponent: () => import('./pages/achievements/achievements').then(m => m.AchievementsComponent)
  },
  // {
  //   path: 'results',
  //   loadComponent: () => import('./pages/results/results').then(m => m.ResultsComponent)
  // },
  {
    path: '**',
    redirectTo: ''
  }
];
