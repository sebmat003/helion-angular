import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { BankAccountHttpService } from './services/bank-account-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BankAccountComponent],
  providers: [BankAccountHttpService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly bankAccountHttpService = inject(BankAccountHttpService);
  accounts$ = this.bankAccountHttpService.getBankAccounts();

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
