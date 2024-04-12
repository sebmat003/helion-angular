import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { BankAccountHttpService } from './services/bank-account-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BankAccountComponent],
  providers: [BankAccountHttpService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];

  constructor(private bankAccountHttpService: BankAccountHttpService) {}

  ngOnInit(): void {
    this.bankAccountHttpService
      .getBankAccounts()
      .subscribe((accounts) => (this.accounts = accounts));
  }

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
