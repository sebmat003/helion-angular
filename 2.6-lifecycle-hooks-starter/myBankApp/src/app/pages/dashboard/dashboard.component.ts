import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  accounts = [
    {
      name: 'Main account',
      balance: 10000,
      currency: 'PLN',
      status: 'active',
    },
    {
      name: 'Second account',
      balance: 2000,
      currency: 'EUR',
      status: 'active',
    },
    {
      name: 'Another account',
      balance: 0,
      currency: 'USD',
      status: 'inactive',
    },
  ];

  onWithdrawMoney(withdrawAmount: number) {
    console.log(withdrawAmount);
    // http request call
  }
}
