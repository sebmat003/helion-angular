import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { BankAccount, Currency } from '../models/dashboard.models';

@Injectable()
export class BankAccountHttpService {
  //dummy data
  BANK_ACCOUNTS: BankAccount[] = [
    {
      id: 1,
      status: 'active',
      name: 'Main account',
      balance: -15000,
      currency: Currency.EUR,
    },
    {
      id: 2,
      status: 'inactive',
      name: 'Invisible',
      balance: 123123,
      currency: Currency.USD,
    },
    {
      id: 3,
      status: 'active',
      name: 'Savings account',
      balance: 32000,
      currency: Currency.PLN,
    },
    {
      id: 4,
      status: 'inactive',
      name: 'Other account',
      balance: 0,
      currency: Currency.USD,
    },
  ];

  getBankAccounts(): Observable<BankAccount[]> {
    return of(this.BANK_ACCOUNTS).pipe(delay(500));
  }

  withdrawMoney(accountId: number, amount: number) {
    this.BANK_ACCOUNTS.forEach((account) => {
      if (account.id === accountId) {
        account.balance -= amount;
      }
    });
  }
}
