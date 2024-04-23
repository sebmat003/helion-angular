import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { BankAccount } from '../../models/dashboard.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BalancePipe, AsyncPipe],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ContentChild('deleteButton') deleteButton!: ElementRef;
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();

  destroy$ = new Subject<void>();
  form!: FormGroup;
  showWithdrawWarning = false;

  get balance(): number {
    return this.account.balance;
  }

  get withdrawControl(): FormControl {
    return this.form.get('withdraw') as FormControl;
  }

  get withdrawControlValue(): number {
    return this.withdrawControl.value;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      withdraw: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(this.account.balance),
        ],
      }),
    });
    this.withdrawControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => {
        this.showWithdrawWarning = value >= 1000;
      });
  }

  withdrawMoney() {
    this.withdrawMoney$.next(this.withdrawControlValue);
    this.form.reset();
  }

  ngAfterContentInit() {
    if (this.account.status === 'inactive') {
      this.deleteButton.nativeElement.disabled = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
