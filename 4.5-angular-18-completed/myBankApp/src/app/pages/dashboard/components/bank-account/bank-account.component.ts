import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
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
import { CardStatusDirective } from '../../../../shared/directives/card-status.directive';
import { InputNumberComponent } from '../../../../shared/components/input-number/input-number.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BalancePipe,
    AsyncPipe,
    CardStatusDirective,
    InputNumberComponent,
  ],
  animations: [
    trigger('fade', [
      transition('void => active', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition('void => inactive', [
        style({
          'background-color': 'rgba(200, 20, 20)',
          transform: 'translateY(100%)',
        }),
        animate(
          500,
          style({ 'background-color': 'white', transform: 'translateY(0%)' }),
        ),
      ]),
      transition('* => void', [animate(1000, style({ opacity: 0 }))]),
    ]),
  ],
})
export class BankAccountComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  deleteButton = contentChild<ElementRef>('deleteButton');
  account = input.required<BankAccount>();
  withdrawMoney$ = output<number>();
  destroy$ = new Subject<void>();
  form!: FormGroup;
  showWithdrawWarning = false;

  get balance(): number {
    return this.account().balance;
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
          Validators.max(this.account().balance),
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
    this.withdrawMoney$.emit(this.withdrawControlValue);
    this.form.reset();
    this.withdrawControl.addValidators(Validators.max(this.account().balance));
  }

  ngAfterContentInit() {
    if (this.account().status === 'inactive') {
      (this.deleteButton() as ElementRef).nativeElement.disabled = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
