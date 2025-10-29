import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss']
})
export class LoadingComponent {
  @Input() message: string = 'جاري التحميل...';
  @Input() type: 'spinner' | 'dots' | 'pulse' = 'spinner';
}
