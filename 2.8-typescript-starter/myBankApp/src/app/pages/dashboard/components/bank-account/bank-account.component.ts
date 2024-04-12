import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, FormsModule, BalancePipe],
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  @Input() account: any;
  @Output() withdrawMoney$ = new EventEmitter<any>();

  moneyToWithdraw = null;

  withdrawMoney() {
    this.withdrawMoney$.next(this.moneyToWithdraw);
    this.moneyToWithdraw = null;
  }
}
