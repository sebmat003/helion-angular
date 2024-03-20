import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable()
export class BankAccountHttpService {
  //dummy data
  BANK_ACCOUNTS: any[] = [
    {
      id: 1,
      status: 'active',
      name: 'Main account',
      balance: -15000,
      currency: 'EUR',
    },
    {
      id: 2,
      status: 'inactive',
      name: 'Invisible',
      balance: 123123,
      currency: 'USD',
    },
    {
      id: 3,
      status: 'active',
      name: 'Savings account',
      balance: 32000,
      currency: 'PLN',
    },
    {
      id: 4,
      status: 'inactive',
      name: 'Other account',
      balance: 0,
      currency: 'USD',
    },
  ];

  getBankAccounts(): Observable<any[]> {
    return of(this.BANK_ACCOUNTS).pipe(delay(500));
  }

  withdrawMoney(accountId: number, amount: number): void {
    this.BANK_ACCOUNTS.forEach((account) => {
      if (account.id === accountId) {
        account.balance -= amount;
      }
    });
  }
}
