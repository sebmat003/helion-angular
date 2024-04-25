import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {
  @Input() startFrom = 30000;
  @Input() decrement = 1000;

  timer$: WritableSignal<number> = signal(this.startFrom);
  destroy$ = new Subject<void>();
  router = inject(Router);

  constructor() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.timer$.update((value) => value - this.decrement));
    effect(() => {
      if (this.timer$() <= 0) {
        this.router.navigateByUrl('login');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
