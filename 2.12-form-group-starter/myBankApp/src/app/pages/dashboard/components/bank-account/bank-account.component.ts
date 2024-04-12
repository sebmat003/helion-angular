import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { BankAccount } from '../../models/dashboard.models';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, FormsModule, BalancePipe],
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();

  moneyToWithdraw: number | null = null;

  withdrawMoney() {
    this.withdrawMoney$.next(this.moneyToWithdraw as number);
    this.moneyToWithdraw = null;
  }
}
